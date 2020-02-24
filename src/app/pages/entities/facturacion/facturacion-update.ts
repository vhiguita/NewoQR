import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Facturacion } from './facturacion.model';
import { FacturacionService } from './facturacion.service';
import { Empresa, EmpresaService } from '../empresa';
import { CuentaAsociada, CuentaAsociadaService } from '../cuenta-asociada';

@Component({
    selector: 'page-facturacion-update',
    templateUrl: 'facturacion-update.html'
})
export class FacturacionUpdatePage implements OnInit {

    facturacion: Facturacion;
    empresas: Empresa[];
    cuentaAsociadas: CuentaAsociada[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        titularFactura: [null, []],
        tipoPersona: [null, []],
        periodicidadFacturacion: [null, []],
        maximoMonto: [null, []],
        valor: [null, []],
        empresa: [null, []],
        identificacion: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private empresaService: EmpresaService,
        private cuentaAsociadaService: CuentaAsociadaService,
        private facturacionService: FacturacionService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.empresaService.query()
            .subscribe(data => { this.empresas = data.body; }, (error) => this.onError(error));
        this.cuentaAsociadaService.query()
            .subscribe(data => { this.cuentaAsociadas = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.facturacion = response.data;
            this.isNew = this.facturacion.id === null || this.facturacion.id === undefined;
        });
    }

    updateForm(facturacion: Facturacion) {
        this.form.patchValue({
            id: facturacion.id,
            titularFactura: facturacion.titularFactura,
            tipoPersona: facturacion.tipoPersona,
            periodicidadFacturacion: facturacion.periodicidadFacturacion,
            maximoMonto: facturacion.maximoMonto,
            valor: facturacion.valor,
            empresa: facturacion.empresa,
            identificacion: facturacion.identificacion,
        });
    }

    save() {
        this.isSaving = true;
        const facturacion = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.facturacionService.update(facturacion));
        } else {
            this.subscribeToSaveResponse(this.facturacionService.create(facturacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Facturacion>>) {
        result.subscribe((res: HttpResponse<Facturacion>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Facturacion ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/facturacion');
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

    private createFromForm(): Facturacion {
        return {
            ...new Facturacion(),
            id: this.form.get(['id']).value,
            titularFactura: this.form.get(['titularFactura']).value,
            tipoPersona: this.form.get(['tipoPersona']).value,
            periodicidadFacturacion: this.form.get(['periodicidadFacturacion']).value,
            maximoMonto: this.form.get(['maximoMonto']).value,
            valor: this.form.get(['valor']).value,
            empresa: this.form.get(['empresa']).value,
            identificacion: this.form.get(['identificacion']).value,
        };
    }

    compareEmpresa(first: Empresa, second: Empresa): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackEmpresaById(index: number, item: Empresa) {
        return item.id;
    }
    compareCuentaAsociada(first: CuentaAsociada, second: CuentaAsociada): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCuentaAsociadaById(index: number, item: CuentaAsociada) {
        return item.id;
    }
}
