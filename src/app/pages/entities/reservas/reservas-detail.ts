import { Component, OnInit } from '@angular/core';
import { Reservas } from './reservas.model';
import { ReservasService } from './reservas.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-reservas-detail',
    templateUrl: 'reservas-detail.html'
})
export class ReservasDetailPage implements OnInit {
    reservas: Reservas = {};

    constructor(
        private navController: NavController,
        private reservasService: ReservasService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.reservas = response.data;
        });
    }

    open(item: Reservas) {
        this.navController.navigateForward('/tabs/entities/reservas/' + item.id + '/edit');
    }

    async deleteModal(item: Reservas) {
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
                        this.reservasService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/reservas');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
