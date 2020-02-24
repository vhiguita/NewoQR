import { Component, OnInit } from '@angular/core';
import { RegistroCompra } from './registro-compra.model';
import { RegistroCompraService } from './registro-compra.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-registro-compra-detail',
    templateUrl: 'registro-compra-detail.html'
})
export class RegistroCompraDetailPage implements OnInit {
    registroCompra: RegistroCompra = {};

    constructor(
        private navController: NavController,
        private registroCompraService: RegistroCompraService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.registroCompra = response.data;
        });
    }

    open(item: RegistroCompra) {
        this.navController.navigateForward('/tabs/entities/registro-compra/' + item.id + '/edit');
    }

    async deleteModal(item: RegistroCompra) {
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
                        this.registroCompraService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/registro-compra');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
