import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoRegistroCompra } from './tipo-registro-compra.model';
import { TipoRegistroCompraService } from './tipo-registro-compra.service';

@Component({
    selector: 'page-tipo-registro-compra-update',
    templateUrl: 'tipo-registro-compra-update.html'
})
export class TipoRegistroCompraUpdatePage implements OnInit {

    tipoRegistroCompra: TipoRegistroCompra;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        descripcion: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private tipoRegistroCompraService: TipoRegistroCompraService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.tipoRegistroCompra = response.data;
            this.isNew = this.tipoRegistroCompra.id === null || this.tipoRegistroCompra.id === undefined;
        });
    }

    updateForm(tipoRegistroCompra: TipoRegistroCompra) {
        this.form.patchValue({
            id: tipoRegistroCompra.id,
            descripcion: tipoRegistroCompra.descripcion,
        });
    }

    save() {
        this.isSaving = true;
        const tipoRegistroCompra = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.tipoRegistroCompraService.update(tipoRegistroCompra));
        } else {
            this.subscribeToSaveResponse(this.tipoRegistroCompraService.create(tipoRegistroCompra));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<TipoRegistroCompra>>) {
        result.subscribe((res: HttpResponse<TipoRegistroCompra>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `TipoRegistroCompra ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/tipo-registro-compra');
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

    private createFromForm(): TipoRegistroCompra {
        return {
            ...new TipoRegistroCompra(),
            id: this.form.get(['id']).value,
            descripcion: this.form.get(['descripcion']).value,
        };
    }

}
