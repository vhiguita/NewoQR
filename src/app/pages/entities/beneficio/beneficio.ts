import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Beneficio } from './beneficio.model';
import { BeneficioService } from './beneficio.service';

@Component({
    selector: 'page-beneficio',
    templateUrl: 'beneficio.html'
})
export class BeneficioPage {
    beneficios: Beneficio[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private beneficioService: BeneficioService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.beneficios = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.beneficioService.query().pipe(
            filter((res: HttpResponse<Beneficio[]>) => res.ok),
            map((res: HttpResponse<Beneficio[]>) => res.body)
        )
        .subscribe(
            (response: Beneficio[]) => {
                this.beneficios = response;
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

    trackId(index: number, item: Beneficio) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/beneficio/new');
    }

    edit(item: IonItemSliding, beneficio: Beneficio) {
        this.navController.navigateForward('/tabs/entities/beneficio/' + beneficio.id + '/edit');
        item.close();
    }

    async delete(beneficio) {
        this.beneficioService.delete(beneficio.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Beneficio deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(beneficio: Beneficio) {
        this.navController.navigateForward('/tabs/entities/beneficio/' + beneficio.id + '/view');
    }
}
