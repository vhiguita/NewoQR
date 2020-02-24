import { Component, OnInit } from '@angular/core';
import { TipoRecurso } from './tipo-recurso.model';
import { TipoRecursoService } from './tipo-recurso.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-tipo-recurso-detail',
    templateUrl: 'tipo-recurso-detail.html'
})
export class TipoRecursoDetailPage implements OnInit {
    tipoRecurso: TipoRecurso = {};

    constructor(
        private navController: NavController,
        private tipoRecursoService: TipoRecursoService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.tipoRecurso = response.data;
        });
    }

    open(item: TipoRecurso) {
        this.navController.navigateForward('/tabs/entities/tipo-recurso/' + item.id + '/edit');
    }

    async deleteModal(item: TipoRecurso) {
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
                        this.tipoRecursoService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/tipo-recurso');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
