import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { RecursosFisicos } from './recursos-fisicos.model';
import { RecursosFisicosService } from './recursos-fisicos.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-recursos-fisicos-detail',
    templateUrl: 'recursos-fisicos-detail.html'
})
export class RecursosFisicosDetailPage implements OnInit {
    recursosFisicos: RecursosFisicos = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private recursosFisicosService: RecursosFisicosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.recursosFisicos = response.data;
        });
    }

    open(item: RecursosFisicos) {
        this.navController.navigateForward('/tabs/entities/recursos-fisicos/' + item.id + '/edit');
    }

    async deleteModal(item: RecursosFisicos) {
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
                        this.recursosFisicosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/recursos-fisicos');
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
