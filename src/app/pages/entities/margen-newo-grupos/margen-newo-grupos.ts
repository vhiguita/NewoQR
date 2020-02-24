import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MargenNewoGrupos } from './margen-newo-grupos.model';
import { MargenNewoGruposService } from './margen-newo-grupos.service';

@Component({
    selector: 'page-margen-newo-grupos',
    templateUrl: 'margen-newo-grupos.html'
})
export class MargenNewoGruposPage {
    margenNewoGrupos: MargenNewoGrupos[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private margenNewoGruposService: MargenNewoGruposService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.margenNewoGrupos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.margenNewoGruposService.query().pipe(
            filter((res: HttpResponse<MargenNewoGrupos[]>) => res.ok),
            map((res: HttpResponse<MargenNewoGrupos[]>) => res.body)
        )
        .subscribe(
            (response: MargenNewoGrupos[]) => {
                this.margenNewoGrupos = response;
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

    trackId(index: number, item: MargenNewoGrupos) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/margen-newo-grupos/new');
    }

    edit(item: IonItemSliding, margenNewoGrupos: MargenNewoGrupos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-grupos/' + margenNewoGrupos.id + '/edit');
        item.close();
    }

    async delete(margenNewoGrupos) {
        this.margenNewoGruposService.delete(margenNewoGrupos.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MargenNewoGrupos deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(margenNewoGrupos: MargenNewoGrupos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-grupos/' + margenNewoGrupos.id + '/view');
    }
}
