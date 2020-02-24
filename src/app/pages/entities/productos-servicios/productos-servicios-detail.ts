import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { ProductosServicios } from './productos-servicios.model';
import { ProductosServiciosService } from './productos-servicios.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-productos-servicios-detail',
    templateUrl: 'productos-servicios-detail.html'
})
export class ProductosServiciosDetailPage implements OnInit {
    productosServicios: ProductosServicios = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private productosServiciosService: ProductosServiciosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.productosServicios = response.data;
        });
    }

    open(item: ProductosServicios) {
        this.navController.navigateForward('/tabs/entities/productos-servicios/' + item.id + '/edit');
    }

    async deleteModal(item: ProductosServicios) {
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
                        this.productosServiciosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/productos-servicios');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

}
