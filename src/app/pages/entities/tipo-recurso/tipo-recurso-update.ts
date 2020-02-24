import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoRecurso } from './tipo-recurso.model';
import { TipoRecursoService } from './tipo-recurso.service';

@Component({
    selector: 'page-tipo-recurso-update',
    templateUrl: 'tipo-recurso-update.html'
})
export class TipoRecursoUpdatePage implements OnInit {

    tipoRecurso: TipoRecurso;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombre: [null, [Validators.required]],
        descripcion: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private tipoRecursoService: TipoRecursoService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.tipoRecurso = response.data;
            this.isNew = this.tipoRecurso.id === null || this.tipoRecurso.id === undefined;
        });
    }

    updateForm(tipoRecurso: TipoRecurso) {
        this.form.patchValue({
            id: tipoRecurso.id,
            nombre: tipoRecurso.nombre,
            descripcion: tipoRecurso.descripcion,
        });
    }

    save() {
        this.isSaving = true;
        const tipoRecurso = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.tipoRecursoService.update(tipoRecurso));
        } else {
            this.subscribeToSaveResponse(this.tipoRecursoService.create(tipoRecurso));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<TipoRecurso>>) {
        result.subscribe((res: HttpResponse<TipoRecurso>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `TipoRecurso ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/tipo-recurso');
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

    private createFromForm(): TipoRecurso {
        return {
            ...new TipoRecurso(),
            id: this.form.get(['id']).value,
            nombre: this.form.get(['nombre']).value,
            descripcion: this.form.get(['descripcion']).value,
        };
    }

}
