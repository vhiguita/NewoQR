import { Component, OnInit } from '@angular/core';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-chat-detail',
    templateUrl: 'chat-detail.html'
})
export class ChatDetailPage implements OnInit {
    chat: Chat = {};

    constructor(
        private navController: NavController,
        private chatService: ChatService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.chat = response.data;
        });
    }

    open(item: Chat) {
        this.navController.navigateForward('/tabs/entities/chat/' + item.id + '/edit');
    }

    async deleteModal(item: Chat) {
        const alert = await this.alertController.create({
            header: 'Confirm the deletion?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.chatService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/chat');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
