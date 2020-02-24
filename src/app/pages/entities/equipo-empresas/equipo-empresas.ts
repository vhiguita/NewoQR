import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { EquipoEmpresas } from './equipo-empresas.model';
import { EquipoEmpresasService } from './equipo-empresas.service';

@Component({
    selector: 'page-equipo-empresas',
    templateUrl: 'equipo-empresas.html'
})
export class EquipoEmpresasPage {
    equipoEmpresas: EquipoEmpresas[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private equipoEmpresasService: EquipoEmpresasService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.equipoEmpresas = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.equipoEmpresasService.query().pipe(
            filter((res: HttpResponse<EquipoEmpresas[]>) => res.ok),
            map((res: HttpResponse<EquipoEmpresas[]>) => res.body)
        )
        .subscribe(
            (response: EquipoEmpresas[]) => {
                this.equipoEmpresas = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: EquipoEmpresas) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/equipo-empresas/new');
    }

    edit(item: IonItemSliding, equipoEmpresas: EquipoEmpresas) {
        this.navController.navigateForward('/tabs/entities/equipo-empresas/' + equipoEmpresas.id + '/edit');
        item.close();
    }

    async delete(equipoEmpresas) {
        this.equipoEmpresasService.delete(equipoEmpresas.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'EquipoEmpresas deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(equipoEmpresas: EquipoEmpresas) {
        this.navController.navigateForward('/tabs/entities/equipo-empresas/' + equipoEmpresas.id + '/view');
    }
}
