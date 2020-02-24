import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CuentaAsociada } from './cuenta-asociada.model';
import { CuentaAsociadaService } from './cuenta-asociada.service';

@Component({
    selector: 'page-cuenta-asociada-update',
    templateUrl: 'cuenta-asociada-update.html'
})
export class CuentaAsociadaUpdatePage implements OnInit {

    cuentaAsociada: CuentaAsociada;
    fechaVencimientoDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        identificaciontitular: [null, [Validators.required]],
        nombreTitular: [null, [Validators.required]],
        apellidoTitular: [null, [Validators.required]],
        numeroCuenta: [null, [Validators.required]],
        tipoCuenta: [null, [Validators.required]],
        codigoSeguridad: [null, [Validators.required]],
        fechaVencimiento: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private cuentaAsociadaService: CuentaAsociadaService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.cuentaAsociada = response.data;
            this.isNew = this.cuentaAsociada.id === null || this.cuentaAsociada.id === undefined;
        });
    }

    updateForm(cuentaAsociada: CuentaAsociada) {
        this.form.patchValue({
            id: cuentaAsociada.id,
            identificaciontitular: cuentaAsociada.identificaciontitular,
            nombreTitular: cuentaAsociada.nombreTitular,
            apellidoTitular: cuentaAsociada.apellidoTitular,
            numeroCuenta: cuentaAsociada.numeroCuenta,
            tipoCuenta: cuentaAsociada.tipoCuenta,
            codigoSeguridad: cuentaAsociada.codigoSeguridad,
            fechaVencimiento: cuentaAsociada.fechaVencimiento,
        });
    }

    save() {
        this.isSaving = true;
        const cuentaAsociada = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.cuentaAsociadaService.update(cuentaAsociada));
        } else {
            this.subscribeToSaveResponse(this.cuentaAsociadaService.create(cuentaAsociada));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<CuentaAsociada>>) {
        result.subscribe((res: HttpResponse<CuentaAsociada>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `CuentaAsociada ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/cuenta-asociada');
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

    private createFromForm(): CuentaAsociada {
        return {
            ...new CuentaAsociada(),
            id: this.form.get(['id']).value,
            identificaciontitular: this.form.get(['identificaciontitular']).value,
            nombreTitular: this.form.get(['nombreTitular']).value,
            apellidoTitular: this.form.get(['apellidoTitular']).value,
            numeroCuenta: this.form.get(['numeroCuenta']).value,
            tipoCuenta: this.form.get(['tipoCuenta']).value,
            codigoSeguridad: this.form.get(['codigoSeguridad']).value,
            fechaVencimiento: this.form.get(['fechaVencimiento']).value,
        };
    }

}
