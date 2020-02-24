import { Component, OnInit } from '@angular/core';
import { MargenNewoGrupos } from './margen-newo-grupos.model';
import { MargenNewoGruposService } from './margen-newo-grupos.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-margen-newo-grupos-detail',
    templateUrl: 'margen-newo-grupos-detail.html'
})
export class MargenNewoGruposDetailPage implements OnInit {
    margenNewoGrupos: MargenNewoGrupos = {};

    constructor(
        private navController: NavController,
        private margenNewoGruposService: MargenNewoGruposService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.margenNewoGrupos = response.data;
        });
    }

    open(item: MargenNewoGrupos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-grupos/' + item.id + '/edit');
    }

    async deleteModal(item: MargenNewoGrupos) {
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
                        this.margenNewoGruposService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/margen-newo-grupos');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
