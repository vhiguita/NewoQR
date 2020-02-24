import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PrepagoConsumo } from './prepago-consumo.model';
import { PrepagoConsumoService } from './prepago-consumo.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { TipoPrepagoConsumo, TipoPrepagoConsumoService } from '../tipo-prepago-consumo';

@Component({
    selector: 'page-prepago-consumo-update',
    templateUrl: 'prepago-consumo-update.html'
})
export class PrepagoConsumoUpdatePage implements OnInit {

    prepagoConsumo: PrepagoConsumo;
    users: User[];
    tipoPrepagoConsumos: TipoPrepagoConsumo[];
    fechaRegistroDp: any;
    fechaSaldoActualDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        aporte: [null, []],
        saldoActual: [null, []],
        fechaRegistro: [null, []],
        fechaSaldoActual: [null, []],
        miembro: [null, []],
        tipoPrepago: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private tipoPrepagoConsumoService: TipoPrepagoConsumoService,
        private prepagoConsumoService: PrepagoConsumoService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.tipoPrepagoConsumoService.query()
            .subscribe(data => { this.tipoPrepagoConsumos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.prepagoConsumo = response.data;
            this.isNew = this.prepagoConsumo.id === null || this.prepagoConsumo.id === undefined;
        });
    }

    updateForm(prepagoConsumo: PrepagoConsumo) {
        this.form.patchValue({
            id: prepagoConsumo.id,
            aporte: prepagoConsumo.aporte,
            saldoActual: prepagoConsumo.saldoActual,
            fechaRegistro: prepagoConsumo.fechaRegistro,
            fechaSaldoActual: prepagoConsumo.fechaSaldoActual,
            miembro: prepagoConsumo.miembro,
            tipoPrepago: prepagoConsumo.tipoPrepago,
        });
    }

    save() {
        this.isSaving = true;
        const prepagoConsumo = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.prepagoConsumoService.update(prepagoConsumo));
        } else {
            this.subscribeToSaveResponse(this.prepagoConsumoService.create(prepagoConsumo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<PrepagoConsumo>>) {
        result.subscribe((res: HttpResponse<PrepagoConsumo>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `PrepagoConsumo ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/prepago-consumo');
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

    private createFromForm(): PrepagoConsumo {
        return {
            ...new PrepagoConsumo(),
            id: this.form.get(['id']).value,
            aporte: this.form.get(['aporte']).value,
            saldoActual: this.form.get(['saldoActual']).value,
            fechaRegistro: this.form.get(['fechaRegistro']).value,
            fechaSaldoActual: this.form.get(['fechaSaldoActual']).value,
            miembro: this.form.get(['miembro']).value,
            tipoPrepago: this.form.get(['tipoPrepago']).value,
        };
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    compareTipoPrepagoConsumo(first: TipoPrepagoConsumo, second: TipoPrepagoConsumo): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTipoPrepagoConsumoById(index: number, item: TipoPrepagoConsumo) {
        return item.id;
    }
}
