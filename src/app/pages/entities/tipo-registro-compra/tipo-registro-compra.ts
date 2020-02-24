import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { TipoRegistroCompra } from './tipo-registro-compra.model';
import { TipoRegistroCompraService } from './tipo-registro-compra.service';

@Component({
    selector: 'page-tipo-registro-compra',
    templateUrl: 'tipo-registro-compra.html'
})
export class TipoRegistroCompraPage {
    tipoRegistroCompras: TipoRegistroCompra[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private tipoRegistroCompraService: TipoRegistroCompraService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.tipoRegistroCompras = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.tipoRegistroCompraService.query().pipe(
            filter((res: HttpResponse<TipoRegistroCompra[]>) => res.ok),
            map((res: HttpResponse<TipoRegistroCompra[]>) => res.body)
        )
        .subscribe(
            (response: TipoRegistroCompra[]) => {
                this.tipoRegistroCompras = response;
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

    trackId(index: number, item: TipoRegistroCompra) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/tipo-registro-compra/new');
    }

    edit(item: IonItemSliding, tipoRegistroCompra: TipoRegistroCompra) {
        this.navController.navigateForward('/tabs/entities/tipo-registro-compra/' + tipoRegistroCompra.id + '/edit');
        item.close();
    }

    async delete(tipoRegistroCompra) {
        this.tipoRegistroCompraService.delete(tipoRegistroCompra.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'TipoRegistroCompra deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(tipoRegistroCompra: TipoRegistroCompra) {
        this.navController.navigateForward('/tabs/entities/tipo-registro-compra/' + tipoRegistroCompra.id + '/view');
    }
}
