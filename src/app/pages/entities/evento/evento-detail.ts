import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Evento } from './evento.model';
import { EventoService } from './evento.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-evento-detail',
    templateUrl: 'evento-detail.html'
})
export class EventoDetailPage implements OnInit {
    evento: Evento = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private eventoService: EventoService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.evento = response.data;
        });
    }

    open(item: Evento) {
        this.navController.navigateForward('/tabs/entities/evento/' + item.id + '/edit');
    }

    async deleteModal(item: Evento) {
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
                        this.eventoService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/evento');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

}
