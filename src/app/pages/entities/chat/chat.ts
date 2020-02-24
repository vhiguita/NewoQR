import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {
    chats: Chat[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private chatService: ChatService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.chats = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.chatService.query().pipe(
            filter((res: HttpResponse<Chat[]>) => res.ok),
            map((res: HttpResponse<Chat[]>) => res.body)
        )
        .subscribe(
            (response: Chat[]) => {
                this.chats = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Chat) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/chat/new');
    }

    edit(item: IonItemSliding, chat: Chat) {
        this.navController.navigateForward('/tabs/entities/chat/' + chat.id + '/edit');
        item.close();
    }

    async delete(chat) {
        this.chatService.delete(chat.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Chat deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(chat: Chat) {
        this.navController.navigateForward('/tabs/entities/chat/' + chat.id + '/view');
    }
}
