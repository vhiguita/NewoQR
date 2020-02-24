import { Component, OnInit } from '@angular/core';
import { Facturacion } from './facturacion.model';
import { FacturacionService } from './facturacion.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-facturacion-detail',
    templateUrl: 'facturacion-detail.html'
})
export class FacturacionDetailPage implements OnInit {
    facturacion: Facturacion = {};

    constructor(
        private navController: NavController,
        private facturacionService: FacturacionService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.facturacion = response.data;
        });
    }

    open(item: Facturacion) {
        this.navController.navigateForward('/tabs/entities/facturacion/' + item.id + '/edit');
    }

    async deleteModal(item: Facturacion) {
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
                        this.facturacionService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/facturacion');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
