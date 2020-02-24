import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Invitados } from './invitados.model';
import { InvitadosService } from './invitados.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-invitados-update',
    templateUrl: 'invitados-update.html'
})
export class InvitadosUpdatePage implements OnInit {

    invitados: Invitados;
    users: User[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombre: [null, [Validators.required]],
        apellido: [null, [Validators.required]],
        tipoDocumento: [null, [Validators.required]],
        identificacion: [null, [Validators.required]],
        correo: [null, [Validators.required]],
        telefono: [null, []],
        user: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private invitadosService: InvitadosService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.invitados = response.data;
            this.isNew = this.invitados.id === null || this.invitados.id === undefined;
        });
    }

    updateForm(invitados: Invitados) {
        this.form.patchValue({
            id: invitados.id,
            nombre: invitados.nombre,
            apellido: invitados.apellido,
            tipoDocumento: invitados.tipoDocumento,
            identificacion: invitados.identificacion,
            correo: invitados.correo,
            telefono: invitados.telefono,
            user: invitados.user,
        });
    }

    save() {
        this.isSaving = true;
        const invitados = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.invitadosService.update(invitados));
        } else {
            this.subscribeToSaveResponse(this.invitadosService.create(invitados));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Invitados>>) {
        result.subscribe((res: HttpResponse<Invitados>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Invitados ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/invitados');
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

    private createFromForm(): Invitados {
        return {
            ...new Invitados(),
            id: this.form.get(['id']).value,
            nombre: this.form.get(['nombre']).value,
            apellido: this.form.get(['apellido']).value,
            tipoDocumento: this.form.get(['tipoDocumento']).value,
            identificacion: this.form.get(['identificacion']).value,
            correo: this.form.get(['correo']).value,
            telefono: this.form.get(['telefono']).value,
            user: this.form.get(['user']).value,
        };
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
