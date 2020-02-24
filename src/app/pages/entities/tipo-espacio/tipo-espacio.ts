import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { TipoEspacio } from './tipo-espacio.model';
import { TipoEspacioService } from './tipo-espacio.service';

@Component({
    selector: 'page-tipo-espacio',
    templateUrl: 'tipo-espacio.html'
})
export class TipoEspacioPage {
    tipoEspacios: TipoEspacio[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private tipoEspacioService: TipoEspacioService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.tipoEspacios = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.tipoEspacioService.query().pipe(
            filter((res: HttpResponse<TipoEspacio[]>) => res.ok),
            map((res: HttpResponse<TipoEspacio[]>) => res.body)
        )
        .subscribe(
            (response: TipoEspacio[]) => {
                this.tipoEspacios = response;
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

    trackId(index: number, item: TipoEspacio) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/tipo-espacio/new');
    }

    edit(item: IonItemSliding, tipoEspacio: TipoEspacio) {
        this.navController.navigateForward('/tabs/entities/tipo-espacio/' + tipoEspacio.id + '/edit');
        item.close();
    }

    async delete(tipoEspacio) {
        this.tipoEspacioService.delete(tipoEspacio.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'TipoEspacio deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(tipoEspacio: TipoEspacio) {
        this.navController.navigateForward('/tabs/entities/tipo-espacio/' + tipoEspacio.id + '/view');
    }
}
