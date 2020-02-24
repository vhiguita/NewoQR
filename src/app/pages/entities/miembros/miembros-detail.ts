import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Miembros } from './miembros.model';
import { MiembrosService } from './miembros.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-miembros-detail',
    templateUrl: 'miembros-detail.html'
})
export class MiembrosDetailPage implements OnInit {
    miembros: Miembros = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private miembrosService: MiembrosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.miembros = response.data;
        });
    }

    open(item: Miembros) {
        this.navController.navigateForward('/tabs/entities/miembros/' + item.id + '/edit');
    }

    async deleteModal(item: Miembros) {
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
                        this.miembrosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/miembros');
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
