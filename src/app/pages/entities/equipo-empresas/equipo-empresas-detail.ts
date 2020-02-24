import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { EquipoEmpresas } from './equipo-empresas.model';
import { EquipoEmpresasService } from './equipo-empresas.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-equipo-empresas-detail',
    templateUrl: 'equipo-empresas-detail.html'
})
export class EquipoEmpresasDetailPage implements OnInit {
    equipoEmpresas: EquipoEmpresas = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private equipoEmpresasService: EquipoEmpresasService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.equipoEmpresas = response.data;
        });
    }

    open(item: EquipoEmpresas) {
        this.navController.navigateForward('/tabs/entities/equipo-empresas/' + item.id + '/edit');
    }

    async deleteModal(item: EquipoEmpresas) {
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
                        this.equipoEmpresasService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/equipo-empresas');
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
