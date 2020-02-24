import { Component, OnInit } from '@angular/core';
import { CuentaAsociada } from './cuenta-asociada.model';
import { CuentaAsociadaService } from './cuenta-asociada.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-cuenta-asociada-detail',
    templateUrl: 'cuenta-asociada-detail.html'
})
export class CuentaAsociadaDetailPage implements OnInit {
    cuentaAsociada: CuentaAsociada = {};

    constructor(
        private navController: NavController,
        private cuentaAsociadaService: CuentaAsociadaService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.cuentaAsociada = response.data;
        });
    }

    open(item: CuentaAsociada) {
        this.navController.navigateForward('/tabs/entities/cuenta-asociada/' + item.id + '/edit');
    }

    async deleteModal(item: CuentaAsociada) {
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
                        this.cuentaAsociadaService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/cuenta-asociada');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
