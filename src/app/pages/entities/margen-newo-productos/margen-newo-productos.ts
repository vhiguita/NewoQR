import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MargenNewoProductos } from './margen-newo-productos.model';
import { MargenNewoProductosService } from './margen-newo-productos.service';

@Component({
    selector: 'page-margen-newo-productos',
    templateUrl: 'margen-newo-productos.html'
})
export class MargenNewoProductosPage {
    margenNewoProductos: MargenNewoProductos[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private margenNewoProductosService: MargenNewoProductosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.margenNewoProductos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.margenNewoProductosService.query().pipe(
            filter((res: HttpResponse<MargenNewoProductos[]>) => res.ok),
            map((res: HttpResponse<MargenNewoProductos[]>) => res.body)
        )
        .subscribe(
            (response: MargenNewoProductos[]) => {
                this.margenNewoProductos = response;
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

    trackId(index: number, item: MargenNewoProductos) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/margen-newo-productos/new');
    }

    edit(item: IonItemSliding, margenNewoProductos: MargenNewoProductos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-productos/' + margenNewoProductos.id + '/edit');
        item.close();
    }

    async delete(margenNewoProductos) {
        this.margenNewoProductosService.delete(margenNewoProductos.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MargenNewoProductos deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(margenNewoProductos: MargenNewoProductos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-productos/' + margenNewoProductos.id + '/view');
    }
}
