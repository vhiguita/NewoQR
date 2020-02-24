import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Facturacion } from './facturacion.model';
import { FacturacionService } from './facturacion.service';

@Component({
    selector: 'page-facturacion',
    templateUrl: 'facturacion.html'
})
export class FacturacionPage {
    facturacions: Facturacion[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private facturacionService: FacturacionService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.facturacions = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.facturacionService.query().pipe(
            filter((res: HttpResponse<Facturacion[]>) => res.ok),
            map((res: HttpResponse<Facturacion[]>) => res.body)
        )
        .subscribe(
            (response: Facturacion[]) => {
                this.facturacions = response;
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

    trackId(index: number, item: Facturacion) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/facturacion/new');
    }

    edit(item: IonItemSliding, facturacion: Facturacion) {
        this.navController.navigateForward('/tabs/entities/facturacion/' + facturacion.id + '/edit');
        item.close();
    }

    async delete(facturacion) {
        this.facturacionService.delete(facturacion.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Facturacion deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(facturacion: Facturacion) {
        this.navController.navigateForward('/tabs/entities/facturacion/' + facturacion.id + '/view');
    }
}
