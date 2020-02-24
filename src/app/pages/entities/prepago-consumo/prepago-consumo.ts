import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { PrepagoConsumo } from './prepago-consumo.model';
import { PrepagoConsumoService } from './prepago-consumo.service';

@Component({
    selector: 'page-prepago-consumo',
    templateUrl: 'prepago-consumo.html'
})
export class PrepagoConsumoPage {
    prepagoConsumos: PrepagoConsumo[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private prepagoConsumoService: PrepagoConsumoService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.prepagoConsumos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.prepagoConsumoService.query().pipe(
            filter((res: HttpResponse<PrepagoConsumo[]>) => res.ok),
            map((res: HttpResponse<PrepagoConsumo[]>) => res.body)
        )
        .subscribe(
            (response: PrepagoConsumo[]) => {
                this.prepagoConsumos = response;
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

    trackId(index: number, item: PrepagoConsumo) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/prepago-consumo/new');
    }

    edit(item: IonItemSliding, prepagoConsumo: PrepagoConsumo) {
        this.navController.navigateForward('/tabs/entities/prepago-consumo/' + prepagoConsumo.id + '/edit');
        item.close();
    }

    async delete(prepagoConsumo) {
        this.prepagoConsumoService.delete(prepagoConsumo.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'PrepagoConsumo deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(prepagoConsumo: PrepagoConsumo) {
        this.navController.navigateForward('/tabs/entities/prepago-consumo/' + prepagoConsumo.id + '/view');
    }
}
