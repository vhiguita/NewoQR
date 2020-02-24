import { Component, OnInit } from '@angular/core';
import { MargenNewoEventos } from './margen-newo-eventos.model';
import { MargenNewoEventosService } from './margen-newo-eventos.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-margen-newo-eventos-detail',
    templateUrl: 'margen-newo-eventos-detail.html'
})
export class MargenNewoEventosDetailPage implements OnInit {
    margenNewoEventos: MargenNewoEventos = {};

    constructor(
        private navController: NavController,
        private margenNewoEventosService: MargenNewoEventosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.margenNewoEventos = response.data;
        });
    }

    open(item: MargenNewoEventos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-eventos/' + item.id + '/edit');
    }

    async deleteModal(item: MargenNewoEventos) {
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
                        this.margenNewoEventosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/margen-newo-eventos');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
