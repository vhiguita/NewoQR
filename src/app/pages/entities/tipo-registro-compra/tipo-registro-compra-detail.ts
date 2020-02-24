import { Component, OnInit } from '@angular/core';
import { TipoRegistroCompra } from './tipo-registro-compra.model';
import { TipoRegistroCompraService } from './tipo-registro-compra.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-tipo-registro-compra-detail',
    templateUrl: 'tipo-registro-compra-detail.html'
})
export class TipoRegistroCompraDetailPage implements OnInit {
    tipoRegistroCompra: TipoRegistroCompra = {};

    constructor(
        private navController: NavController,
        private tipoRegistroCompraService: TipoRegistroCompraService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.tipoRegistroCompra = response.data;
        });
    }

    open(item: TipoRegistroCompra) {
        this.navController.navigateForward('/tabs/entities/tipo-registro-compra/' + item.id + '/edit');
    }

    async deleteModal(item: TipoRegistroCompra) {
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
                        this.tipoRegistroCompraService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/tipo-registro-compra');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
