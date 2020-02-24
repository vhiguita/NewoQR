import { Component, OnInit } from '@angular/core';
import { RegistroFacturacion } from './registro-facturacion.model';
import { RegistroFacturacionService } from './registro-facturacion.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-registro-facturacion-detail',
    templateUrl: 'registro-facturacion-detail.html'
})
export class RegistroFacturacionDetailPage implements OnInit {
    registroFacturacion: RegistroFacturacion = {};

    constructor(
        private navController: NavController,
        private registroFacturacionService: RegistroFacturacionService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.registroFacturacion = response.data;
        });
    }

    open(item: RegistroFacturacion) {
        this.navController.navigateForward('/tabs/entities/registro-facturacion/' + item.id + '/edit');
    }

    async deleteModal(item: RegistroFacturacion) {
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
                        this.registroFacturacionService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/registro-facturacion');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
