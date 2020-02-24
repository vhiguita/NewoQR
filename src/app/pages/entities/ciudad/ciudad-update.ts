import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Ciudad } from './ciudad.model';
import { CiudadService } from './ciudad.service';
import { Pais, PaisService } from '../pais';

@Component({
    selector: 'page-ciudad-update',
    templateUrl: 'ciudad-update.html'
})
export class CiudadUpdatePage implements OnInit {

    ciudad: Ciudad;
    pais: Pais[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombreCiudad: [null, [Validators.required]],
        pais: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private paisService: PaisService,
        private ciudadService: CiudadService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.paisService.query()
            .subscribe(data => { this.pais = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.ciudad = response.data;
            this.isNew = this.ciudad.id === null || this.ciudad.id === undefined;
        });
    }

    updateForm(ciudad: Ciudad) {
        this.form.patchValue({
            id: ciudad.id,
            nombreCiudad: ciudad.nombreCiudad,
            pais: ciudad.pais,
        });
    }

    save() {
        this.isSaving = true;
        const ciudad = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.ciudadService.update(ciudad));
        } else {
            this.subscribeToSaveResponse(this.ciudadService.create(ciudad));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Ciudad>>) {
        result.subscribe((res: HttpResponse<Ciudad>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Ciudad ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/ciudad');
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

    private createFromForm(): Ciudad {
        return {
            ...new Ciudad(),
            id: this.form.get(['id']).value,
            nombreCiudad: this.form.get(['nombreCiudad']).value,
            pais: this.form.get(['pais']).value,
        };
    }

    comparePais(first: Pais, second: Pais): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackPaisById(index: number, item: Pais) {
        return item.id;
    }
}
