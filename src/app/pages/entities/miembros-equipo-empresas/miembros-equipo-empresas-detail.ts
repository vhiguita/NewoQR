import { Component, OnInit } from '@angular/core';
import { MiembrosEquipoEmpresas } from './miembros-equipo-empresas.model';
import { MiembrosEquipoEmpresasService } from './miembros-equipo-empresas.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-miembros-equipo-empresas-detail',
    templateUrl: 'miembros-equipo-empresas-detail.html'
})
export class MiembrosEquipoEmpresasDetailPage implements OnInit {
    miembrosEquipoEmpresas: MiembrosEquipoEmpresas = {};

    constructor(
        private navController: NavController,
        private miembrosEquipoEmpresasService: MiembrosEquipoEmpresasService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.miembrosEquipoEmpresas = response.data;
        });
    }

    open(item: MiembrosEquipoEmpresas) {
        this.navController.navigateForward('/tabs/entities/miembros-equipo-empresas/' + item.id + '/edit');
    }

    async deleteModal(item: MiembrosEquipoEmpresas) {
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
                        this.miembrosEquipoEmpresasService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/miembros-equipo-empresas');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
