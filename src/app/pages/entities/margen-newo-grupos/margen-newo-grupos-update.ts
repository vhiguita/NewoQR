import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MargenNewoGrupos } from './margen-newo-grupos.model';
import { MargenNewoGruposService } from './margen-newo-grupos.service';
import { Grupos, GruposService } from '../grupos';

@Component({
    selector: 'page-margen-newo-grupos-update',
    templateUrl: 'margen-newo-grupos-update.html'
})
export class MargenNewoGruposUpdatePage implements OnInit {

    margenNewoGrupos: MargenNewoGrupos;
    grupos: Grupos[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        porcentajeMargen: [null, []],
        grupo: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private gruposService: GruposService,
        private margenNewoGruposService: MargenNewoGruposService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.gruposService.query()
            .subscribe(data => { this.grupos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.margenNewoGrupos = response.data;
            this.isNew = this.margenNewoGrupos.id === null || this.margenNewoGrupos.id === undefined;
        });
    }

    updateForm(margenNewoGrupos: MargenNewoGrupos) {
        this.form.patchValue({
            id: margenNewoGrupos.id,
            porcentajeMargen: margenNewoGrupos.porcentajeMargen,
            grupo: margenNewoGrupos.grupo,
        });
    }

    save() {
        this.isSaving = true;
        const margenNewoGrupos = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.margenNewoGruposService.update(margenNewoGrupos));
        } else {
            this.subscribeToSaveResponse(this.margenNewoGruposService.create(margenNewoGrupos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MargenNewoGrupos>>) {
        result.subscribe((res: HttpResponse<MargenNewoGrupos>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MargenNewoGrupos ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/margen-newo-grupos');
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

    private createFromForm(): MargenNewoGrupos {
        return {
            ...new MargenNewoGrupos(),
            id: this.form.get(['id']).value,
            porcentajeMargen: this.form.get(['porcentajeMargen']).value,
            grupo: this.form.get(['grupo']).value,
        };
    }

    compareGrupos(first: Grupos, second: Grupos): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackGruposById(index: number, item: Grupos) {
        return item.id;
    }
}
