import { Component, OnInit } from '@angular/core';
import { MiembrosGrupo } from './miembros-grupo.model';
import { MiembrosGrupoService } from './miembros-grupo.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-miembros-grupo-detail',
    templateUrl: 'miembros-grupo-detail.html'
})
export class MiembrosGrupoDetailPage implements OnInit {
    miembrosGrupo: MiembrosGrupo = {};

    constructor(
        private navController: NavController,
        private miembrosGrupoService: MiembrosGrupoService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.miembrosGrupo = response.data;
        });
    }

    open(item: MiembrosGrupo) {
        this.navController.navigateForward('/tabs/entities/miembros-grupo/' + item.id + '/edit');
    }

    async deleteModal(item: MiembrosGrupo) {
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
                        this.miembrosGrupoService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/miembros-grupo');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
