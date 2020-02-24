import { Component, OnInit } from '@angular/core';
import { MargenNewoProductos } from './margen-newo-productos.model';
import { MargenNewoProductosService } from './margen-newo-productos.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-margen-newo-productos-detail',
    templateUrl: 'margen-newo-productos-detail.html'
})
export class MargenNewoProductosDetailPage implements OnInit {
    margenNewoProductos: MargenNewoProductos = {};

    constructor(
        private navController: NavController,
        private margenNewoProductosService: MargenNewoProductosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.margenNewoProductos = response.data;
        });
    }

    open(item: MargenNewoProductos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-productos/' + item.id + '/edit');
    }

    async deleteModal(item: MargenNewoProductos) {
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
                        this.margenNewoProductosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/margen-newo-productos');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
