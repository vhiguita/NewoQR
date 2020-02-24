import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CuentaAsociada } from './cuenta-asociada.model';
import { CuentaAsociadaService } from './cuenta-asociada.service';

@Component({
    selector: 'page-cuenta-asociada',
    templateUrl: 'cuenta-asociada.html'
})
export class CuentaAsociadaPage {
    cuentaAsociadas: CuentaAsociada[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private cuentaAsociadaService: CuentaAsociadaService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.cuentaAsociadas = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.cuentaAsociadaService.query().pipe(
            filter((res: HttpResponse<CuentaAsociada[]>) => res.ok),
            map((res: HttpResponse<CuentaAsociada[]>) => res.body)
        )
        .subscribe(
            (response: CuentaAsociada[]) => {
                this.cuentaAsociadas = response;
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

    trackId(index: number, item: CuentaAsociada) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/cuenta-asociada/new');
    }

    edit(item: IonItemSliding, cuentaAsociada: CuentaAsociada) {
        this.navController.navigateForward('/tabs/entities/cuenta-asociada/' + cuentaAsociada.id + '/edit');
        item.close();
    }

    async delete(cuentaAsociada) {
        this.cuentaAsociadaService.delete(cuentaAsociada.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'CuentaAsociada deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(cuentaAsociada: CuentaAsociada) {
        this.navController.navigateForward('/tabs/entities/cuenta-asociada/' + cuentaAsociada.id + '/view');
    }
}
