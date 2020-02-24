import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatsListado } from './chats-listado.model';
import { ChatsListadoService } from './chats-listado.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-chats-listado-update',
    templateUrl: 'chats-listado-update.html'
})
export class ChatsListadoUpdatePage implements OnInit {

    chatsListado: ChatsListado;
    users: User[];
    sendTime: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        descripcion: [null, []],
        estatus: [null, []],
        count: [null, []],
        badge: [null, []],
        time: [null, []],
        sendTime: [null, []],
        grupo: ['false', []],
        propietario: [null, []],
        destinatario: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private chatsListadoService: ChatsListadoService
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
            this.chatsListado = response.data;
            this.isNew = this.chatsListado.id === null || this.chatsListado.id === undefined;
        });
    }

    updateForm(chatsListado: ChatsListado) {
        this.form.patchValue({
            id: chatsListado.id,
            descripcion: chatsListado.descripcion,
            estatus: chatsListado.estatus,
            count: chatsListado.count,
            badge: chatsListado.badge,
            time: chatsListado.time,
            sendTime: (this.isNew) ? new Date().toISOString() : chatsListado.sendTime,
            grupo: chatsListado.grupo,
            propietario: chatsListado.propietario,
            destinatario: chatsListado.destinatario,
        });
    }

    save() {
        this.isSaving = true;
        const chatsListado = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.chatsListadoService.update(chatsListado));
        } else {
            this.subscribeToSaveResponse(this.chatsListadoService.create(chatsListado));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ChatsListado>>) {
        result.subscribe((res: HttpResponse<ChatsListado>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ChatsListado ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/chats-listado');
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

    private createFromForm(): ChatsListado {
        return {
            ...new ChatsListado(),
            id: this.form.get(['id']).value,
            descripcion: this.form.get(['descripcion']).value,
            estatus: this.form.get(['estatus']).value,
            count: this.form.get(['count']).value,
            badge: this.form.get(['badge']).value,
            time: this.form.get(['time']).value,
            sendTime: new Date(this.form.get(['sendTime']).value),
            grupo: this.form.get(['grupo']).value,
            propietario: this.form.get(['propietario']).value,
            destinatario: this.form.get(['destinatario']).value,
        };
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
