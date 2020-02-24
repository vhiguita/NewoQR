import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { TipoPrepagoConsumo } from './tipo-prepago-consumo.model';
import { TipoPrepagoConsumoService } from './tipo-prepago-consumo.service';

@Component({
    selector: 'page-tipo-prepago-consumo',
    templateUrl: 'tipo-prepago-consumo.html'
})
export class TipoPrepagoConsumoPage {
    tipoPrepagoConsumos: TipoPrepagoConsumo[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private tipoPrepagoConsumoService: TipoPrepagoConsumoService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.tipoPrepagoConsumos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.tipoPrepagoConsumoService.query().pipe(
            filter((res: HttpResponse<TipoPrepagoConsumo[]>) => res.ok),
            map((res: HttpResponse<TipoPrepagoConsumo[]>) => res.body)
        )
        .subscribe(
            (response: TipoPrepagoConsumo[]) => {
                this.tipoPrepagoConsumos = response;
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

    trackId(index: number, item: TipoPrepagoConsumo) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/tipo-prepago-consumo/new');
    }

    edit(item: IonItemSliding, tipoPrepagoConsumo: TipoPrepagoConsumo) {
        this.navController.navigateForward('/tabs/entities/tipo-prepago-consumo/' + tipoPrepagoConsumo.id + '/edit');
        item.close();
    }

    async delete(tipoPrepagoConsumo) {
        this.tipoPrepagoConsumoService.delete(tipoPrepagoConsumo.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'TipoPrepagoConsumo deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(tipoPrepagoConsumo: TipoPrepagoConsumo) {
        this.navController.navigateForward('/tabs/entities/tipo-prepago-consumo/' + tipoPrepagoConsumo.id + '/view');
    }
}
