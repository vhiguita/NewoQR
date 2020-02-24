import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { EspaciosReserva } from './espacios-reserva.model';
import { EspaciosReservaService } from './espacios-reserva.service';

@Component({
    selector: 'page-espacios-reserva',
    templateUrl: 'espacios-reserva.html'
})
export class EspaciosReservaPage {
    espaciosReservas: EspaciosReserva[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private espaciosReservaService: EspaciosReservaService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.espaciosReservas = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.espaciosReservaService.query().pipe(
            filter((res: HttpResponse<EspaciosReserva[]>) => res.ok),
            map((res: HttpResponse<EspaciosReserva[]>) => res.body)
        )
        .subscribe(
            (response: EspaciosReserva[]) => {
                this.espaciosReservas = response;
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

    trackId(index: number, item: EspaciosReserva) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/espacios-reserva/new');
    }

    edit(item: IonItemSliding, espaciosReserva: EspaciosReserva) {
        this.navController.navigateForward('/tabs/entities/espacios-reserva/' + espaciosReserva.id + '/edit');
        item.close();
    }

    async delete(espaciosReserva) {
        this.espaciosReservaService.delete(espaciosReserva.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'EspaciosReserva deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(espaciosReserva: EspaciosReserva) {
        this.navController.navigateForward('/tabs/entities/espacios-reserva/' + espaciosReserva.id + '/view');
    }
}
