import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservas } from './reservas.model';
import { ReservasService } from './reservas.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { EspaciosReserva, EspaciosReservaService } from '../espacios-reserva';

@Component({
    selector: 'page-reservas-update',
    templateUrl: 'reservas-update.html'
})
export class ReservasUpdatePage implements OnInit {

    reservas: Reservas;
    users: User[];
    espaciosReservas: EspaciosReserva[];
    registroFechaEntrada: string;
    registroFechaSalida: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        registroFechaEntrada: [null, [Validators.required]],
        registroFechaSalida: [null, [Validators.required]],
        estadoReserva: [null, []],
        titulo: [null, []],
        descripcion: [null, []],
        user: [null, []],
        espacio: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private espaciosReservaService: EspaciosReservaService,
        private reservasService: ReservasService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.espaciosReservaService.query()
            .subscribe(data => { this.espaciosReservas = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.reservas = response.data;
            this.isNew = this.reservas.id === null || this.reservas.id === undefined;
        });
    }

    updateForm(reservas: Reservas) {
        this.form.patchValue({
            id: reservas.id,
            registroFechaEntrada: (this.isNew) ? new Date().toISOString() : reservas.registroFechaEntrada,
            registroFechaSalida: (this.isNew) ? new Date().toISOString() : reservas.registroFechaSalida,
            estadoReserva: reservas.estadoReserva,
            titulo: reservas.titulo,
            descripcion: reservas.descripcion,
            user: reservas.user,
            espacio: reservas.espacio,
        });
    }

    save() {
        this.isSaving = true;
        const reservas = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.reservasService.update(reservas));
        } else {
            this.subscribeToSaveResponse(this.reservasService.create(reservas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Reservas>>) {
        result.subscribe((res: HttpResponse<Reservas>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Reservas ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/reservas');
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

    private createFromForm(): Reservas {
        return {
            ...new Reservas(),
            id: this.form.get(['id']).value,
            registroFechaEntrada: new Date(this.form.get(['registroFechaEntrada']).value),
            registroFechaSalida: new Date(this.form.get(['registroFechaSalida']).value),
            estadoReserva: this.form.get(['estadoReserva']).value,
            titulo: this.form.get(['titulo']).value,
            descripcion: this.form.get(['descripcion']).value,
            user: this.form.get(['user']).value,
            espacio: this.form.get(['espacio']).value,
        };
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    compareEspaciosReserva(first: EspaciosReserva, second: EspaciosReserva): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackEspaciosReservaById(index: number, item: EspaciosReserva) {
        return item.id;
    }
}
