import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MiembrosEquipoEmpresas } from './miembros-equipo-empresas.model';
import { MiembrosEquipoEmpresasService } from './miembros-equipo-empresas.service';

@Component({
    selector: 'page-miembros-equipo-empresas',
    templateUrl: 'miembros-equipo-empresas.html'
})
export class MiembrosEquipoEmpresasPage {
    miembrosEquipoEmpresas: MiembrosEquipoEmpresas[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private miembrosEquipoEmpresasService: MiembrosEquipoEmpresasService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.miembrosEquipoEmpresas = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.miembrosEquipoEmpresasService.query().pipe(
            filter((res: HttpResponse<MiembrosEquipoEmpresas[]>) => res.ok),
            map((res: HttpResponse<MiembrosEquipoEmpresas[]>) => res.body)
        )
        .subscribe(
            (response: MiembrosEquipoEmpresas[]) => {
                this.miembrosEquipoEmpresas = response;
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

    trackId(index: number, item: MiembrosEquipoEmpresas) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/miembros-equipo-empresas/new');
    }

    edit(item: IonItemSliding, miembrosEquipoEmpresas: MiembrosEquipoEmpresas) {
        this.navController.navigateForward('/tabs/entities/miembros-equipo-empresas/' + miembrosEquipoEmpresas.id + '/edit');
        item.close();
    }

    async delete(miembrosEquipoEmpresas) {
        this.miembrosEquipoEmpresasService.delete(miembrosEquipoEmpresas.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MiembrosEquipoEmpresas deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(miembrosEquipoEmpresas: MiembrosEquipoEmpresas) {
        this.navController.navigateForward('/tabs/entities/miembros-equipo-empresas/' + miembrosEquipoEmpresas.id + '/view');
    }
}
