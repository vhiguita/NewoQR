import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-empresa-detail',
    templateUrl: 'empresa-detail.html'
})
export class EmpresaDetailPage implements OnInit {
    empresa: Empresa = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private empresaService: EmpresaService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.empresa = response.data;
        });
    }

    open(item: Empresa) {
        this.navController.navigateForward('/tabs/entities/empresa/' + item.id + '/edit');
    }

    async deleteModal(item: Empresa) {
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
                        this.empresaService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/empresa');
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
