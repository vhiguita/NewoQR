import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MiembrosEquipoEmpresas } from './miembros-equipo-empresas.model';
import { MiembrosEquipoEmpresasService } from './miembros-equipo-empresas.service';
import { EquipoEmpresas, EquipoEmpresasService } from '../equipo-empresas';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-miembros-equipo-empresas-update',
    templateUrl: 'miembros-equipo-empresas-update.html'
})
export class MiembrosEquipoEmpresasUpdatePage implements OnInit {

    miembrosEquipoEmpresas: MiembrosEquipoEmpresas;
    equipoEmpresas: EquipoEmpresas[];
    users: User[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        equipo: [null, []],
        miembro: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private equipoEmpresasService: EquipoEmpresasService,
        private userService: UserService,
        private miembrosEquipoEmpresasService: MiembrosEquipoEmpresasService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.equipoEmpresasService.query()
            .subscribe(data => { this.equipoEmpresas = data.body; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.miembrosEquipoEmpresas = response.data;
            this.isNew = this.miembrosEquipoEmpresas.id === null || this.miembrosEquipoEmpresas.id === undefined;
        });
    }

    updateForm(miembrosEquipoEmpresas: MiembrosEquipoEmpresas) {
        this.form.patchValue({
            id: miembrosEquipoEmpresas.id,
            equipo: miembrosEquipoEmpresas.equipo,
            miembro: miembrosEquipoEmpresas.miembro,
        });
    }

    save() {
        this.isSaving = true;
        const miembrosEquipoEmpresas = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.miembrosEquipoEmpresasService.update(miembrosEquipoEmpresas));
        } else {
            this.subscribeToSaveResponse(this.miembrosEquipoEmpresasService.create(miembrosEquipoEmpresas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MiembrosEquipoEmpresas>>) {
        result.subscribe((res: HttpResponse<MiembrosEquipoEmpresas>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MiembrosEquipoEmpresas ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/miembros-equipo-empresas');
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

    private createFromForm(): MiembrosEquipoEmpresas {
        return {
            ...new MiembrosEquipoEmpresas(),
            id: this.form.get(['id']).value,
            equipo: this.form.get(['equipo']).value,
            miembro: this.form.get(['miembro']).value,
        };
    }

    compareEquipoEmpresas(first: EquipoEmpresas, second: EquipoEmpresas): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackEquipoEmpresasById(index: number, item: EquipoEmpresas) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
