import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistroCompra } from './registro-compra.model';
import { RegistroCompraService } from './registro-compra.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { TipoRegistroCompra, TipoRegistroCompraService } from '../tipo-registro-compra';

@Component({
    selector: 'page-registro-compra-update',
    templateUrl: 'registro-compra-update.html'
})
export class RegistroCompraUpdatePage implements OnInit {

    registroCompra: RegistroCompra;
    users: User[];
    tipoRegistroCompras: TipoRegistroCompra[];
    fechaRegistro: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        valor: [null, []],
        fechaRegistro: [null, []],
        idTransaccion: [null, []],
        user: [null, []],
        tipoRegistro: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private tipoRegistroCompraService: TipoRegistroCompraService,
        private registroCompraService: RegistroCompraService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.tipoRegistroCompraService.query()
            .subscribe(data => { this.tipoRegistroCompras = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.registroCompra = response.data;
            this.isNew = this.registroCompra.id === null || this.registroCompra.id === undefined;
        });
    }

    updateForm(registroCompra: RegistroCompra) {
        this.form.patchValue({
            id: registroCompra.id,
            valor: registroCompra.valor,
            fechaRegistro: (this.isNew) ? new Date().toISOString() : registroCompra.fechaRegistro,
            idTransaccion: registroCompra.idTransaccion,
            user: registroCompra.user,
            tipoRegistro: registroCompra.tipoRegistro,
        });
    }

    save() {
        this.isSaving = true;
        const registroCompra = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.registroCompraService.update(registroCompra));
        } else {
            this.subscribeToSaveResponse(this.registroCompraService.create(registroCompra));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<RegistroCompra>>) {
        result.subscribe((res: HttpResponse<RegistroCompra>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `RegistroCompra ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/registro-compra');
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

    private createFromForm(): RegistroCompra {
        return {
            ...new RegistroCompra(),
            id: this.form.get(['id']).value,
            valor: this.form.get(['valor']).value,
            fechaRegistro: new Date(this.form.get(['fechaRegistro']).value),
            idTransaccion: this.form.get(['idTransaccion']).value,
            user: this.form.get(['user']).value,
            tipoRegistro: this.form.get(['tipoRegistro']).value,
        };
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    compareTipoRegistroCompra(first: TipoRegistroCompra, second: TipoRegistroCompra): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTipoRegistroCompraById(index: number, item: TipoRegistroCompra) {
        return item.id;
    }
}
