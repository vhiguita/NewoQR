import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistroFacturacion } from './registro-facturacion.model';
import { RegistroFacturacionService } from './registro-facturacion.service';
import { TipoRegistroCompra, TipoRegistroCompraService } from '../tipo-registro-compra';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-registro-facturacion-update',
    templateUrl: 'registro-facturacion-update.html'
})
export class RegistroFacturacionUpdatePage implements OnInit {

    registroFacturacion: RegistroFacturacion;
    tipoRegistroCompras: TipoRegistroCompra[];
    users: User[];
    fechaRegistro: string;
    fechaFacturacionDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        valor: [null, []],
        fechaRegistro: [null, []],
        fechaFacturacion: [null, []],
        tipoRegistro: [null, []],
        user: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private tipoRegistroCompraService: TipoRegistroCompraService,
        private userService: UserService,
        private registroFacturacionService: RegistroFacturacionService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.tipoRegistroCompraService.query()
            .subscribe(data => { this.tipoRegistroCompras = data.body; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.registroFacturacion = response.data;
            this.isNew = this.registroFacturacion.id === null || this.registroFacturacion.id === undefined;
        });
    }

    updateForm(registroFacturacion: RegistroFacturacion) {
        this.form.patchValue({
            id: registroFacturacion.id,
            valor: registroFacturacion.valor,
            fechaRegistro: (this.isNew) ? new Date().toISOString() : registroFacturacion.fechaRegistro,
            fechaFacturacion: registroFacturacion.fechaFacturacion,
            tipoRegistro: registroFacturacion.tipoRegistro,
            user: registroFacturacion.user,
        });
    }

    save() {
        this.isSaving = true;
        const registroFacturacion = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.registroFacturacionService.update(registroFacturacion));
        } else {
            this.subscribeToSaveResponse(this.registroFacturacionService.create(registroFacturacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<RegistroFacturacion>>) {
        result.subscribe((res: HttpResponse<RegistroFacturacion>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `RegistroFacturacion ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/registro-facturacion');
    }

    previousState() {
        window.history.back();
    }

    async onError(error) {
        this.isSaving = false;
        console.error(error);
        const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    private createFromForm(): RegistroFacturacion {
        return {
            ...new RegistroFacturacion(),
            id: this.form.get(['id']).value,
            valor: this.form.get(['valor']).value,
            fechaRegistro: new Date(this.form.get(['fechaRegistro']).value),
            fechaFacturacion: this.form.get(['fechaFacturacion']).value,
            tipoRegistro: this.form.get(['tipoRegistro']).value,
            user: this.form.get(['user']).value,
        };
    }

    compareTipoRegistroCompra(first: TipoRegistroCompra, second: TipoRegistroCompra): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTipoRegistroCompraById(index: number, item: TipoRegistroCompra) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
