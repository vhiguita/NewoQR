import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoEspacio } from './tipo-espacio.model';
import { TipoEspacioService } from './tipo-espacio.service';

@Component({
    selector: 'page-tipo-espacio-update',
    templateUrl: 'tipo-espacio-update.html'
})
export class TipoEspacioUpdatePage implements OnInit {

    tipoEspacio: TipoEspacio;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        tipoEspacio: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private tipoEspacioService: TipoEspacioService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.tipoEspacio = response.data;
            this.isNew = this.tipoEspacio.id === null || this.tipoEspacio.id === undefined;
        });
    }

    updateForm(tipoEspacio: TipoEspacio) {
        this.form.patchValue({
            id: tipoEspacio.id,
            tipoEspacio: tipoEspacio.tipoEspacio,
        });
    }

    save() {
        this.isSaving = true;
        const tipoEspacio = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.tipoEspacioService.update(tipoEspacio));
        } else {
            this.subscribeToSaveResponse(this.tipoEspacioService.create(tipoEspacio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<TipoEspacio>>) {
        result.subscribe((res: HttpResponse<TipoEspacio>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `TipoEspacio ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/tipo-espacio');
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

    private createFromForm(): TipoEspacio {
        return {
            ...new TipoEspacio(),
            id: this.form.get(['id']).value,
            tipoEspacio: this.form.get(['tipoEspacio']).value,
        };
    }

}
