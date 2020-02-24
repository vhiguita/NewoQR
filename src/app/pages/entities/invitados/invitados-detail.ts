import { Component, OnInit } from '@angular/core';
import { Invitados } from './invitados.model';
import { InvitadosService } from './invitados.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-invitados-detail',
    templateUrl: 'invitados-detail.html'
})
export class InvitadosDetailPage implements OnInit {
    invitados: Invitados = {};

    constructor(
        private navController: NavController,
        private invitadosService: InvitadosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.invitados = response.data;
        });
    }

    open(item: Invitados) {
        this.navController.navigateForward('/tabs/entities/invitados/' + item.id + '/edit');
    }

    async deleteModal(item: Invitados) {
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
                        this.invitadosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/invitados');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
