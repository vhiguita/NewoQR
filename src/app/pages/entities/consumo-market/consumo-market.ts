import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ConsumoMarket } from './consumo-market.model';
import { ConsumoMarketService } from './consumo-market.service';

@Component({
    selector: 'page-consumo-market',
    templateUrl: 'consumo-market.html'
})
export class ConsumoMarketPage {
    consumoMarkets: ConsumoMarket[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private consumoMarketService: ConsumoMarketService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.consumoMarkets = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.consumoMarketService.query().pipe(
            filter((res: HttpResponse<ConsumoMarket[]>) => res.ok),
            map((res: HttpResponse<ConsumoMarket[]>) => res.body)
        )
        .subscribe(
            (response: ConsumoMarket[]) => {
                this.consumoMarkets = response;
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

    trackId(index: number, item: ConsumoMarket) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/consumo-market/new');
    }

    edit(item: IonItemSliding, consumoMarket: ConsumoMarket) {
        this.navController.navigateForward('/tabs/entities/consumo-market/' + consumoMarket.id + '/edit');
        item.close();
    }

    async delete(consumoMarket) {
        this.consumoMarketService.delete(consumoMarket.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ConsumoMarket deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(consumoMarket: ConsumoMarket) {
        this.navController.navigateForward('/tabs/entities/consumo-market/' + consumoMarket.id + '/view');
    }
}
