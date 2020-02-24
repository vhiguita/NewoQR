import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Invitacion } from './invitacion.model';
import { InvitacionService } from './invitacion.service';
import { Sedes, SedesService } from '../sedes';
import { Invitados, InvitadosService } from '../invitados';

@Component({
    selector: 'page-invitacion-update',
    templateUrl: 'invitacion-update.html'
})
export class InvitacionUpdatePage implements OnInit {

    invitacion: Invitacion;
    sedes: Sedes[];
    invitados: Invitados[];
    fechaInicio: string;
    fechaFin: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        fechaInicio: [null, []],
        fechaFin: [null, []],
        sede: [null, []],
        invitado: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private sedesService: SedesService,
        private invitadosService: InvitadosService,
        private invitacionService: InvitacionService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.sedesService.query()
            .subscribe(data => { this.sedes = data.body; }, (error) => this.onError(error));
        this.invitadosService.query()
            .subscribe(data => { this.invitados = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.invitacion = response.data;
            this.isNew = this.invitacion.id === null || this.invitacion.id === undefined;
        });
    }

    updateForm(invitacion: Invitacion) {
        this.form.patchValue({
            id: invitacion.id,
            fechaInicio: (this.isNew) ? new Date().toISOString() : invitacion.fechaInicio,
            fechaFin: (this.isNew) ? new Date().toISOString() : invitacion.fechaFin,
            sede: invitacion.sede,
            invitado: invitacion.invitado,
        });
    }

    save() {
        this.isSaving = true;
        const invitacion = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.invitacionService.update(invitacion));
        } else {
            this.subscribeToSaveResponse(this.invitacionService.create(invitacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Invitacion>>) {
        result.subscribe((res: HttpResponse<Invitacion>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Invitacion ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/invitacion');
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

    private createFromForm(): Invitacion {
        return {
            ...new Invitacion(),
            id: this.form.get(['id']).value,
            fechaInicio: new Date(this.form.get(['fechaInicio']).value),
            fechaFin: new Date(this.form.get(['fechaFin']).value),
            sede: this.form.get(['sede']).value,
            invitado: this.form.get(['invitado']).value,
        };
    }

    compareSedes(first: Sedes, second: Sedes): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackSedesById(index: number, item: Sedes) {
        return item.id;
    }
    compareInvitados(first: Invitados, second: Invitados): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackInvitadosById(index: number, item: Invitados) {
        return item.id;
    }
}
