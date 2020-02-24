import { Component, OnInit } from '@angular/core';
import { EntradaMiembros } from './entrada-miembros.model';
import { EntradaMiembrosService } from './entrada-miembros.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-entrada-miembros-detail',
    templateUrl: 'entrada-miembros-detail.html'
})
export class EntradaMiembrosDetailPage implements OnInit {
    entradaMiembros: EntradaMiembros = {};

    constructor(
        private navController: NavController,
        private entradaMiembrosService: EntradaMiembrosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.entradaMiembros = response.data;
        });
    }

    open(item: EntradaMiembros) {
        this.navController.navigateForward('/tabs/entities/entrada-miembros/' + item.id + '/edit');
    }

    async deleteModal(item: EntradaMiembros) {
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
                        this.entradaMiembrosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/entrada-miembros');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
