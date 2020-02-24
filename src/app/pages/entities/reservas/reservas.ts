import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Reservas } from './reservas.model';
import { ReservasService } from './reservas.service';

@Component({
    selector: 'page-reservas',
    templateUrl: 'reservas.html'
})
export class ReservasPage {
    reservas: Reservas[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private reservasService: ReservasService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.reservas = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.reservasService.query().pipe(
            filter((res: HttpResponse<Reservas[]>) => res.ok),
            map((res: HttpResponse<Reservas[]>) => res.body)
        )
        .subscribe(
            (response: Reservas[]) => {
                this.reservas = response;
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

    trackId(index: number, item: Reservas) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/reservas/new');
    }

    edit(item: IonItemSliding, reservas: Reservas) {
        this.navController.navigateForward('/tabs/entities/reservas/' + reservas.id + '/edit');
        item.close();
    }

    async delete(reservas) {
        this.reservasService.delete(reservas.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Reservas deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(reservas: Reservas) {
        this.navController.navigateForward('/tabs/entities/reservas/' + reservas.id + '/view');
    }
}
