import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EntradaInvitados } from './entrada-invitados.model';
import { EntradaInvitadosService } from './entrada-invitados.service';
import { Sedes, SedesService } from '../sedes';
import { Invitados, InvitadosService } from '../invitados';

@Component({
    selector: 'page-entrada-invitados-update',
    templateUrl: 'entrada-invitados-update.html'
})
export class EntradaInvitadosUpdatePage implements OnInit {

    entradaInvitados: EntradaInvitados;
    sedes: Sedes[];
    invitados: Invitados[];
    registroFecha: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        registroFecha: [null, []],
        salida: ['false', []],
        tiempoMaximo: ['false', []],
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
        private entradaInvitadosService: EntradaInvitadosService
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
            this.entradaInvitados = response.data;
            this.isNew = this.entradaInvitados.id === null || this.entradaInvitados.id === undefined;
        });
    }

    updateForm(entradaInvitados: EntradaInvitados) {
        this.form.patchValue({
            id: entradaInvitados.id,
            registroFecha: (this.isNew) ? new Date().toISOString() : entradaInvitados.registroFecha,
            salida: entradaInvitados.salida,
            tiempoMaximo: entradaInvitados.tiempoMaximo,
            sede: entradaInvitados.sede,
            invitado: entradaInvitados.invitado,
        });
    }

    save() {
        this.isSaving = true;
        const entradaInvitados = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.entradaInvitadosService.update(entradaInvitados));
        } else {
            this.subscribeToSaveResponse(this.entradaInvitadosService.create(entradaInvitados));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<EntradaInvitados>>) {
        result.subscribe((res: HttpResponse<EntradaInvitados>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `EntradaInvitados ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/entrada-invitados');
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

    private createFromForm(): EntradaInvitados {
        return {
            ...new EntradaInvitados(),
            id: this.form.get(['id']).value,
            registroFecha: new Date(this.form.get(['registroFecha']).value),
            salida: this.form.get(['salida']).value,
            tiempoMaximo: this.form.get(['tiempoMaximo']).value,
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
