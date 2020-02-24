import { Component, OnInit } from '@angular/core';
import { Beneficio } from './beneficio.model';
import { BeneficioService } from './beneficio.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-beneficio-detail',
    templateUrl: 'beneficio-detail.html'
})
export class BeneficioDetailPage implements OnInit {
    beneficio: Beneficio = {};

    constructor(
        private navController: NavController,
        private beneficioService: BeneficioService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.beneficio = response.data;
        });
    }

    open(item: Beneficio) {
        this.navController.navigateForward('/tabs/entities/beneficio/' + item.id + '/edit');
    }

    async deleteModal(item: Beneficio) {
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
                        this.beneficioService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/beneficio');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
