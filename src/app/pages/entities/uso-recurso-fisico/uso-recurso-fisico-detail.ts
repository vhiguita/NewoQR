import { Component, OnInit } from '@angular/core';
import { UsoRecursoFisico } from './uso-recurso-fisico.model';
import { UsoRecursoFisicoService } from './uso-recurso-fisico.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-uso-recurso-fisico-detail',
    templateUrl: 'uso-recurso-fisico-detail.html'
})
export class UsoRecursoFisicoDetailPage implements OnInit {
    usoRecursoFisico: UsoRecursoFisico = {};

    constructor(
        private navController: NavController,
        private usoRecursoFisicoService: UsoRecursoFisicoService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.usoRecursoFisico = response.data;
        });
    }

    open(item: UsoRecursoFisico) {
        this.navController.navigateForward('/tabs/entities/uso-recurso-fisico/' + item.id + '/edit');
    }

    async deleteModal(item: UsoRecursoFisico) {
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
                        this.usoRecursoFisicoService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/uso-recurso-fisico');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
