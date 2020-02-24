import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pais } from './pais.model';
import { PaisService } from './pais.service';

@Component({
    selector: 'page-pais-update',
    templateUrl: 'pais-update.html'
})
export class PaisUpdatePage implements OnInit {

    pais: Pais;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombrePais: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private paisService: PaisService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.pais = response.data;
            this.isNew = this.pais.id === null || this.pais.id === undefined;
        });
    }

    updateForm(pais: Pais) {
        this.form.patchValue({
            id: pais.id,
            nombrePais: pais.nombrePais,
        });
    }

    save() {
        this.isSaving = true;
        const pais = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.paisService.update(pais));
        } else {
            this.subscribeToSaveResponse(this.paisService.create(pais));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Pais>>) {
        result.subscribe((res: HttpResponse<Pais>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Pais ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/pais');
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

    private createFromForm(): Pais {
        return {
            ...new Pais(),
            id: this.form.get(['id']).value,
            nombrePais: this.form.get(['nombrePais']).value,
        };
    }

}
