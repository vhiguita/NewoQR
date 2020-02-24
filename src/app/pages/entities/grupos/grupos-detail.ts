import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Grupos } from './grupos.model';
import { GruposService } from './grupos.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-grupos-detail',
    templateUrl: 'grupos-detail.html'
})
export class GruposDetailPage implements OnInit {
    grupos: Grupos = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private gruposService: GruposService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.grupos = response.data;
        });
    }

    open(item: Grupos) {
        this.navController.navigateForward('/tabs/entities/grupos/' + item.id + '/edit');
    }

    async deleteModal(item: Grupos) {
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
                        this.gruposService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/grupos');
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
