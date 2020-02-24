import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Pais } from './pais.model';
import { PaisService } from './pais.service';

@Component({
    selector: 'page-pais',
    templateUrl: 'pais.html'
})
export class PaisPage {
    pais: Pais[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private paisService: PaisService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.pais = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.paisService.query().pipe(
            filter((res: HttpResponse<Pais[]>) => res.ok),
            map((res: HttpResponse<Pais[]>) => res.body)
        )
        .subscribe(
            (response: Pais[]) => {
                this.pais = response;
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

    trackId(index: number, item: Pais) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/pais/new');
    }

    edit(item: IonItemSliding, pais: Pais) {
        this.navController.navigateForward('/tabs/entities/pais/' + pais.id + '/edit');
        item.close();
    }

    async delete(pais) {
        this.paisService.delete(pais.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Pais deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(pais: Pais) {
        this.navController.navigateForward('/tabs/entities/pais/' + pais.id + '/view');
    }
}
