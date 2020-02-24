import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import { ChatsListado, ChatsListadoService } from '../chats-listado';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-chat-update',
    templateUrl: 'chat-update.html'
})
export class ChatUpdatePage implements OnInit {

    chat: Chat;
    chatsListados: ChatsListado[];
    users: User[];
    fecha: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        mensaje: [null, [Validators.required]],
        sender: [null, []],
        read: ['false', []],
        delivered: ['false', []],
        sent: ['false', []],
        fecha: [null, []],
        chatsListado: [null, []],
        de: [null, []],
        para: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private chatsListadoService: ChatsListadoService,
        private userService: UserService,
        private chatService: ChatService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.chatsListadoService.query()
            .subscribe(data => { this.chatsListados = data.body; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.chat = response.data;
            this.isNew = this.chat.id === null || this.chat.id === undefined;
        });
    }

    updateForm(chat: Chat) {
        this.form.patchValue({
            id: chat.id,
            mensaje: chat.mensaje,
            sender: chat.sender,
            read: chat.read,
            delivered: chat.delivered,
            sent: chat.sent,
            fecha: (this.isNew) ? new Date().toISOString() : chat.fecha,
            chatsListado: chat.chatsListado,
            de: chat.de,
            para: chat.para,
        });
    }

    save() {
        this.isSaving = true;
        const chat = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.chatService.update(chat));
        } else {
            this.subscribeToSaveResponse(this.chatService.create(chat));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Chat>>) {
        result.subscribe((res: HttpResponse<Chat>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Chat ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/chat');
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

    private createFromForm(): Chat {
        return {
            ...new Chat(),
            id: this.form.get(['id']).value,
            mensaje: this.form.get(['mensaje']).value,
            sender: this.form.get(['sender']).value,
            read: this.form.get(['read']).value,
            delivered: this.form.get(['delivered']).value,
            sent: this.form.get(['sent']).value,
            fecha: new Date(this.form.get(['fecha']).value),
            chatsListado: this.form.get(['chatsListado']).value,
            de: this.form.get(['de']).value,
            para: this.form.get(['para']).value,
        };
    }

    compareChatsListado(first: ChatsListado, second: ChatsListado): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackChatsListadoById(index: number, item: ChatsListado) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
