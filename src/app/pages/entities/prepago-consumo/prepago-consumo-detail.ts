import { Component, OnInit } from '@angular/core';
import { PrepagoConsumo } from './prepago-consumo.model';
import { PrepagoConsumoService } from './prepago-consumo.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-prepago-consumo-detail',
    templateUrl: 'prepago-consumo-detail.html'
})
export class PrepagoConsumoDetailPage implements OnInit {
    prepagoConsumo: PrepagoConsumo = {};

    constructor(
        private navController: NavController,
        private prepagoConsumoService: PrepagoConsumoService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.prepagoConsumo = response.data;
        });
    }

    open(item: PrepagoConsumo) {
        this.navController.navigateForward('/tabs/entities/prepago-consumo/' + item.id + '/edit');
    }

    async deleteModal(item: PrepagoConsumo) {
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
                        this.prepagoConsumoService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/prepago-consumo');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
