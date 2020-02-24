import { Component, OnInit } from '@angular/core';
import { ConsumoMarket } from './consumo-market.model';
import { ConsumoMarketService } from './consumo-market.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-consumo-market-detail',
    templateUrl: 'consumo-market-detail.html'
})
export class ConsumoMarketDetailPage implements OnInit {
    consumoMarket: ConsumoMarket = {};

    constructor(
        private navController: NavController,
        private consumoMarketService: ConsumoMarketService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.consumoMarket = response.data;
        });
    }

    open(item: ConsumoMarket) {
        this.navController.navigateForward('/tabs/entities/consumo-market/' + item.id + '/edit');
    }

    async deleteModal(item: ConsumoMarket) {
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
                        this.consumoMarketService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/consumo-market');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
