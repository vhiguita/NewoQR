import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EntradaMiembros } from './entrada-miembros.model';
import { EntradaMiembrosService } from './entrada-miembros.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { Sedes, SedesService } from '../sedes';

@Component({
    selector: 'page-entrada-miembros-update',
    templateUrl: 'entrada-miembros-update.html'
})
export class EntradaMiembrosUpdatePage implements OnInit {

    entradaMiembros: EntradaMiembros;
    users: User[];
    sedes: Sedes[];
    registroFecha: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        registroFecha: [null, []],
        salida: ['false', []],
        tiempoMaximo: ['false', []],
        user: [null, []],
        sede: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private sedesService: SedesService,
        private entradaMiembrosService: EntradaMiembrosService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.sedesService.query()
            .subscribe(data => { this.sedes = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.entradaMiembros = response.data;
            this.isNew = this.entradaMiembros.id === null || this.entradaMiembros.id === undefined;
        });
    }

    updateForm(entradaMiembros: EntradaMiembros) {
        this.form.patchValue({
            id: entradaMiembros.id,
            registroFecha: (this.isNew) ? new Date().toISOString() : entradaMiembros.registroFecha,
            salida: entradaMiembros.salida,
            tiempoMaximo: entradaMiembros.tiempoMaximo,
            user: entradaMiembros.user,
            sede: entradaMiembros.sede,
        });
    }

    save() {
        this.isSaving = true;
        const entradaMiembros = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.entradaMiembrosService.update(entradaMiembros));
        } else {
            this.subscribeToSaveResponse(this.entradaMiembrosService.create(entradaMiembros));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<EntradaMiembros>>) {
        result.subscribe((res: HttpResponse<EntradaMiembros>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `EntradaMiembros ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/entrada-miembros');
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

    private createFromForm(): EntradaMiembros {
        return {
            ...new EntradaMiembros(),
            id: this.form.get(['id']).value,
            registroFecha: new Date(this.form.get(['registroFecha']).value),
            salida: this.form.get(['salida']).value,
            tiempoMaximo: this.form.get(['tiempoMaximo']).value,
            user: this.form.get(['user']).value,
            sede: this.form.get(['sede']).value,
        };
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    compareSedes(first: Sedes, second: Sedes): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackSedesById(index: number, item: Sedes) {
        return item.id;
    }
}
