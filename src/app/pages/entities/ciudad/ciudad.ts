import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Ciudad } from './ciudad.model';
import { CiudadService } from './ciudad.service';

@Component({
    selector: 'page-ciudad',
    templateUrl: 'ciudad.html'
})
export class CiudadPage {
    ciudads: Ciudad[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private ciudadService: CiudadService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.ciudads = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.ciudadService.query().pipe(
            filter((res: HttpResponse<Ciudad[]>) => res.ok),
            map((res: HttpResponse<Ciudad[]>) => res.body)
        )
        .subscribe(
            (response: Ciudad[]) => {
                this.ciudads = response;
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

    trackId(index: number, item: Ciudad) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/ciudad/new');
    }

    edit(item: IonItemSliding, ciudad: Ciudad) {
        this.navController.navigateForward('/tabs/entities/ciudad/' + ciudad.id + '/edit');
        item.close();
    }

    async delete(ciudad) {
        this.ciudadService.delete(ciudad.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Ciudad deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(ciudad: Ciudad) {
        this.navController.navigateForward('/tabs/entities/ciudad/' + ciudad.id + '/view');
    }
}
