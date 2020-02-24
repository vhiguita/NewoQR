import { Component, OnInit } from '@angular/core';
import { EntradaInvitados } from './entrada-invitados.model';
import { EntradaInvitadosService } from './entrada-invitados.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-entrada-invitados-detail',
    templateUrl: 'entrada-invitados-detail.html'
})
export class EntradaInvitadosDetailPage implements OnInit {
    entradaInvitados: EntradaInvitados = {};

    constructor(
        private navController: NavController,
        private entradaInvitadosService: EntradaInvitadosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.entradaInvitados = response.data;
        });
    }

    open(item: EntradaInvitados) {
        this.navController.navigateForward('/tabs/entities/entrada-invitados/' + item.id + '/edit');
    }

    async deleteModal(item: EntradaInvitados) {
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
                        this.entradaInvitadosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/entrada-invitados');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
