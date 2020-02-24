import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoPrepagoConsumo } from './tipo-prepago-consumo.model';
import { TipoPrepagoConsumoService } from './tipo-prepago-consumo.service';
import { Beneficio, BeneficioService } from '../beneficio';

@Component({
    selector: 'page-tipo-prepago-consumo-update',
    templateUrl: 'tipo-prepago-consumo-update.html'
})
export class TipoPrepagoConsumoUpdatePage implements OnInit {

    tipoPrepagoConsumo: TipoPrepagoConsumo;
    beneficios: Beneficio[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombre: [null, [Validators.required]],
        descripcion: [null, [Validators.required]],
        valorMinimo: [null, [Validators.required]],
        valorMaximo: [null, [Validators.required]],
        tipoBeneficio: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private beneficioService: BeneficioService,
        private tipoPrepagoConsumoService: TipoPrepagoConsumoService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.beneficioService.query()
            .subscribe(data => { this.beneficios = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.tipoPrepagoConsumo = response.data;
            this.isNew = this.tipoPrepagoConsumo.id === null || this.tipoPrepagoConsumo.id === undefined;
        });
    }

    updateForm(tipoPrepagoConsumo: TipoPrepagoConsumo) {
        this.form.patchValue({
            id: tipoPrepagoConsumo.id,
            nombre: tipoPrepagoConsumo.nombre,
            descripcion: tipoPrepagoConsumo.descripcion,
            valorMinimo: tipoPrepagoConsumo.valorMinimo,
            valorMaximo: tipoPrepagoConsumo.valorMaximo,
            tipoBeneficio: tipoPrepagoConsumo.tipoBeneficio,
        });
    }

    save() {
        this.isSaving = true;
        const tipoPrepagoConsumo = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.tipoPrepagoConsumoService.update(tipoPrepagoConsumo));
        } else {
            this.subscribeToSaveResponse(this.tipoPrepagoConsumoService.create(tipoPrepagoConsumo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<TipoPrepagoConsumo>>) {
        result.subscribe((res: HttpResponse<TipoPrepagoConsumo>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `TipoPrepagoConsumo ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/tipo-prepago-consumo');
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

    private createFromForm(): TipoPrepagoConsumo {
        return {
            ...new TipoPrepagoConsumo(),
            id: this.form.get(['id']).value,
            nombre: this.form.get(['nombre']).value,
            descripcion: this.form.get(['descripcion']).value,
            valorMinimo: this.form.get(['valorMinimo']).value,
            valorMaximo: this.form.get(['valorMaximo']).value,
            tipoBeneficio: this.form.get(['tipoBeneficio']).value,
        };
    }

    compareBeneficio(first: Beneficio, second: Beneficio): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackBeneficioById(index: number, item: Beneficio) {
        return item.id;
    }
}
