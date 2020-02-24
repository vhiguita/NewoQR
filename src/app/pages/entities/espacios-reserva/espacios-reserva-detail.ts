import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { EspaciosReserva } from './espacios-reserva.model';
import { EspaciosReservaService } from './espacios-reserva.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-espacios-reserva-detail',
    templateUrl: 'espacios-reserva-detail.html'
})
export class EspaciosReservaDetailPage implements OnInit {
    espaciosReserva: EspaciosReserva = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private espaciosReservaService: EspaciosReservaService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.espaciosReserva = response.data;
        });
    }

    open(item: EspaciosReserva) {
        this.navController.navigateForward('/tabs/entities/espacios-reserva/' + item.id + '/edit');
    }

    async deleteModal(item: EspaciosReserva) {
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
                        this.espaciosReservaService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/espacios-reserva');
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
