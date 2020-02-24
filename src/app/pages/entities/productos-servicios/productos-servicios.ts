import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { ProductosServicios } from './productos-servicios.model';
import { ProductosServiciosService } from './productos-servicios.service';

@Component({
    selector: 'page-productos-servicios',
    templateUrl: 'productos-servicios.html'
})
export class ProductosServiciosPage {
    productosServicios: ProductosServicios[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private productosServiciosService: ProductosServiciosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.productosServicios = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.productosServiciosService.query().pipe(
            filter((res: HttpResponse<ProductosServicios[]>) => res.ok),
            map((res: HttpResponse<ProductosServicios[]>) => res.body)
        )
        .subscribe(
            (response: ProductosServicios[]) => {
                this.productosServicios = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: ProductosServicios) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/productos-servicios/new');
    }

    edit(item: IonItemSliding, productosServicios: ProductosServicios) {
        this.navController.navigateForward('/tabs/entities/productos-servicios/' + productosServicios.id + '/edit');
        item.close();
    }

    async delete(productosServicios) {
        this.productosServiciosService.delete(productosServicios.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ProductosServicios deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(productosServicios: ProductosServicios) {
        this.navController.navigateForward('/tabs/entities/productos-servicios/' + productosServicios.id + '/view');
    }
}
