import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MiembrosGrupo } from './miembros-grupo.model';
import { MiembrosGrupoService } from './miembros-grupo.service';

@Component({
    selector: 'page-miembros-grupo',
    templateUrl: 'miembros-grupo.html'
})
export class MiembrosGrupoPage {
    miembrosGrupos: MiembrosGrupo[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private miembrosGrupoService: MiembrosGrupoService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.miembrosGrupos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.miembrosGrupoService.query().pipe(
            filter((res: HttpResponse<MiembrosGrupo[]>) => res.ok),
            map((res: HttpResponse<MiembrosGrupo[]>) => res.body)
        )
        .subscribe(
            (response: MiembrosGrupo[]) => {
                this.miembrosGrupos = response;
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

    trackId(index: number, item: MiembrosGrupo) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/miembros-grupo/new');
    }

    edit(item: IonItemSliding, miembrosGrupo: MiembrosGrupo) {
        this.navController.navigateForward('/tabs/entities/miembros-grupo/' + miembrosGrupo.id + '/edit');
        item.close();
    }

    async delete(miembrosGrupo) {
        this.miembrosGrupoService.delete(miembrosGrupo.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MiembrosGrupo deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(miembrosGrupo: MiembrosGrupo) {
        this.navController.navigateForward('/tabs/entities/miembros-grupo/' + miembrosGrupo.id + '/view');
    }
}
