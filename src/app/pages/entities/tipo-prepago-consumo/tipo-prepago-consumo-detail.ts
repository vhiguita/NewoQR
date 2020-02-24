import { Component, OnInit } from '@angular/core';
import { TipoPrepagoConsumo } from './tipo-prepago-consumo.model';
import { TipoPrepagoConsumoService } from './tipo-prepago-consumo.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-tipo-prepago-consumo-detail',
    templateUrl: 'tipo-prepago-consumo-detail.html'
})
export class TipoPrepagoConsumoDetailPage implements OnInit {
    tipoPrepagoConsumo: TipoPrepagoConsumo = {};

    constructor(
        private navController: NavController,
        private tipoPrepagoConsumoService: TipoPrepagoConsumoService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.tipoPrepagoConsumo = response.data;
        });
    }

    open(item: TipoPrepagoConsumo) {
        this.navController.navigateForward('/tabs/entities/tipo-prepago-consumo/' + item.id + '/edit');
    }

    async deleteModal(item: TipoPrepagoConsumo) {
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
                        this.tipoPrepagoConsumoService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/tipo-prepago-consumo');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
