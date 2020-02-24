import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { RegistroCompra } from './registro-compra.model';
import { RegistroCompraService } from './registro-compra.service';

@Component({
    selector: 'page-registro-compra',
    templateUrl: 'registro-compra.html'
})
export class RegistroCompraPage {
    registroCompras: RegistroCompra[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private registroCompraService: RegistroCompraService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.registroCompras = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.registroCompraService.query().pipe(
            filter((res: HttpResponse<RegistroCompra[]>) => res.ok),
            map((res: HttpResponse<RegistroCompra[]>) => res.body)
        )
        .subscribe(
            (response: RegistroCompra[]) => {
                this.registroCompras = response;
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

    trackId(index: number, item: RegistroCompra) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/registro-compra/new');
    }

    edit(item: IonItemSliding, registroCompra: RegistroCompra) {
        this.navController.navigateForward('/tabs/entities/registro-compra/' + registroCompra.id + '/edit');
        item.close();
    }

    async delete(registroCompra) {
        this.registroCompraService.delete(registroCompra.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'RegistroCompra deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(registroCompra: RegistroCompra) {
        this.navController.navigateForward('/tabs/entities/registro-compra/' + registroCompra.id + '/view');
    }
}
