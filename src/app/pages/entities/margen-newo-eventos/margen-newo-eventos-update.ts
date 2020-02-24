import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MargenNewoEventos } from './margen-newo-eventos.model';
import { MargenNewoEventosService } from './margen-newo-eventos.service';
import { Evento, EventoService } from '../evento';

@Component({
    selector: 'page-margen-newo-eventos-update',
    templateUrl: 'margen-newo-eventos-update.html'
})
export class MargenNewoEventosUpdatePage implements OnInit {

    margenNewoEventos: MargenNewoEventos;
    eventos: Evento[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        porcentajeMargen: [null, []],
        evento: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private eventoService: EventoService,
        private margenNewoEventosService: MargenNewoEventosService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.eventoService
            .query({filter: 'margennewoeventos-is-null'})
            .subscribe(data => {
                if (!this.margenNewoEventos.evento || !this.margenNewoEventos.evento.id) {
                    this.eventos = data.body;
                } else {
                    this.eventoService
                        .find(this.margenNewoEventos.evento.id)
                        .subscribe((subData: HttpResponse<Evento>) => {
                            this.eventos = [subData.body].concat(subData.body);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.margenNewoEventos = response.data;
            this.isNew = this.margenNewoEventos.id === null || this.margenNewoEventos.id === undefined;
        });
    }

    updateForm(margenNewoEventos: MargenNewoEventos) {
        this.form.patchValue({
            id: margenNewoEventos.id,
            porcentajeMargen: margenNewoEventos.porcentajeMargen,
            evento: margenNewoEventos.evento,
        });
    }

    save() {
        this.isSaving = true;
        const margenNewoEventos = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.margenNewoEventosService.update(margenNewoEventos));
        } else {
            this.subscribeToSaveResponse(this.margenNewoEventosService.create(margenNewoEventos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MargenNewoEventos>>) {
        result.subscribe((res: HttpResponse<MargenNewoEventos>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MargenNewoEventos ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/margen-newo-eventos');
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

    private createFromForm(): MargenNewoEventos {
        return {
            ...new MargenNewoEventos(),
            id: this.form.get(['id']).value,
            porcentajeMargen: this.form.get(['porcentajeMargen']).value,
            evento: this.form.get(['evento']).value,
        };
    }

    compareEvento(first: Evento, second: Evento): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackEventoById(index: number, item: Evento) {
        return item.id;
    }
}
