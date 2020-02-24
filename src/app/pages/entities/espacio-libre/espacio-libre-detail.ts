import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { EspacioLibre } from './espacio-libre.model';
import { EspacioLibreService } from './espacio-libre.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-espacio-libre-detail',
    templateUrl: 'espacio-libre-detail.html'
})
export class EspacioLibreDetailPage implements OnInit {
    espacioLibre: EspacioLibre = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private espacioLibreService: EspacioLibreService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.espacioLibre = response.data;
        });
    }

    open(item: EspacioLibre) {
        this.navController.navigateForward('/tabs/entities/espacio-libre/' + item.id + '/edit');
    }

    async deleteModal(item: EspacioLibre) {
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
                        this.espacioLibreService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/espacio-libre');
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
