import { Component, OnInit } from '@angular/core';
import { Pais } from './pais.model';
import { PaisService } from './pais.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-pais-detail',
    templateUrl: 'pais-detail.html'
})
export class PaisDetailPage implements OnInit {
    pais: Pais = {};

    constructor(
        private navController: NavController,
        private paisService: PaisService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.pais = response.data;
        });
    }

    open(item: Pais) {
        this.navController.navigateForward('/tabs/entities/pais/' + item.id + '/edit');
    }

    async deleteModal(item: Pais) {
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
                        this.paisService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/pais');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
