import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Sedes } from './sedes.model';
import { SedesService } from './sedes.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-sedes-detail',
    templateUrl: 'sedes-detail.html'
})
export class SedesDetailPage implements OnInit {
    sedes: Sedes = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private sedesService: SedesService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.sedes = response.data;
        });
    }

    open(item: Sedes) {
        this.navController.navigateForward('/tabs/entities/sedes/' + item.id + '/edit');
    }

    async deleteModal(item: Sedes) {
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
                        this.sedesService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/sedes');
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
