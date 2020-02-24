import { Component, OnInit } from '@angular/core';
import { TipoEspacio } from './tipo-espacio.model';
import { TipoEspacioService } from './tipo-espacio.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-tipo-espacio-detail',
    templateUrl: 'tipo-espacio-detail.html'
})
export class TipoEspacioDetailPage implements OnInit {
    tipoEspacio: TipoEspacio = {};

    constructor(
        private navController: NavController,
        private tipoEspacioService: TipoEspacioService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.tipoEspacio = response.data;
        });
    }

    open(item: TipoEspacio) {
        this.navController.navigateForward('/tabs/entities/tipo-espacio/' + item.id + '/edit');
    }

    async deleteModal(item: TipoEspacio) {
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
                        this.tipoEspacioService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/tipo-espacio');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
