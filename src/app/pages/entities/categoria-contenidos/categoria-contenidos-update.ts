import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaContenidos } from './categoria-contenidos.model';
import { CategoriaContenidosService } from './categoria-contenidos.service';

@Component({
    selector: 'page-categoria-contenidos-update',
    templateUrl: 'categoria-contenidos-update.html'
})
export class CategoriaContenidosUpdatePage implements OnInit {

    categoriaContenidos: CategoriaContenidos;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        categoria: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private categoriaContenidosService: CategoriaContenidosService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.categoriaContenidos = response.data;
            this.isNew = this.categoriaContenidos.id === null || this.categoriaContenidos.id === undefined;
        });
    }

    updateForm(categoriaContenidos: CategoriaContenidos) {
        this.form.patchValue({
            id: categoriaContenidos.id,
            categoria: categoriaContenidos.categoria,
        });
    }

    save() {
        this.isSaving = true;
        const categoriaContenidos = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.categoriaContenidosService.update(categoriaContenidos));
        } else {
            this.subscribeToSaveResponse(this.categoriaContenidosService.create(categoriaContenidos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<CategoriaContenidos>>) {
        result.subscribe((res: HttpResponse<CategoriaContenidos>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `CategoriaContenidos ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/categoria-contenidos');
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

    private createFromForm(): CategoriaContenidos {
        return {
            ...new CategoriaContenidos(),
            id: this.form.get(['id']).value,
            categoria: this.form.get(['categoria']).value,
        };
    }

}
