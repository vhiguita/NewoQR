import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MargenNewoEventos } from './margen-newo-eventos.model';
import { MargenNewoEventosService } from './margen-newo-eventos.service';

@Component({
    selector: 'page-margen-newo-eventos',
    templateUrl: 'margen-newo-eventos.html'
})
export class MargenNewoEventosPage {
    margenNewoEventos: MargenNewoEventos[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private margenNewoEventosService: MargenNewoEventosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.margenNewoEventos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.margenNewoEventosService.query().pipe(
            filter((res: HttpResponse<MargenNewoEventos[]>) => res.ok),
            map((res: HttpResponse<MargenNewoEventos[]>) => res.body)
        )
        .subscribe(
            (response: MargenNewoEventos[]) => {
                this.margenNewoEventos = response;
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

    trackId(index: number, item: MargenNewoEventos) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/margen-newo-eventos/new');
    }

    edit(item: IonItemSliding, margenNewoEventos: MargenNewoEventos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-eventos/' + margenNewoEventos.id + '/edit');
        item.close();
    }

    async delete(margenNewoEventos) {
        this.margenNewoEventosService.delete(margenNewoEventos.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MargenNewoEventos deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(margenNewoEventos: MargenNewoEventos) {
        this.navController.navigateForward('/tabs/entities/margen-newo-eventos/' + margenNewoEventos.id + '/view');
    }
}
