import { Component, OnInit } from '@angular/core';
import { Invitacion } from './invitacion.model';
import { InvitacionService } from './invitacion.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-invitacion-detail',
    templateUrl: 'invitacion-detail.html'
})
export class InvitacionDetailPage implements OnInit {
    invitacion: Invitacion = {};

    constructor(
        private navController: NavController,
        private invitacionService: InvitacionService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.invitacion = response.data;
        });
    }

    open(item: Invitacion) {
        this.navController.navigateForward('/tabs/entities/invitacion/' + item.id + '/edit');
    }

    async deleteModal(item: Invitacion) {
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
                        this.invitacionService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/invitacion');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
