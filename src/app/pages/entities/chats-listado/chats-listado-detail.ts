import { Component, OnInit } from '@angular/core';
import { ChatsListado } from './chats-listado.model';
import { ChatsListadoService } from './chats-listado.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-chats-listado-detail',
    templateUrl: 'chats-listado-detail.html'
})
export class ChatsListadoDetailPage implements OnInit {
    chatsListado: ChatsListado = {};

    constructor(
        private navController: NavController,
        private chatsListadoService: ChatsListadoService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.chatsListado = response.data;
        });
    }

    open(item: ChatsListado) {
        this.navController.navigateForward('/tabs/entities/chats-listado/' + item.id + '/edit');
    }

    async deleteModal(item: ChatsListado) {
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
                        this.chatsListadoService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/chats-listado');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
