import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { Landing } from './landing.model';
import { LandingService } from './landing.service';

@Component({
    selector: 'page-landing',
    templateUrl: 'landing.html'
})
export class LandingPage {
    landings: Landing[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private landingService: LandingService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.landings = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.landingService.query().pipe(
            filter((res: HttpResponse<Landing[]>) => res.ok),
            map((res: HttpResponse<Landing[]>) => res.body)
        )
        .subscribe(
            (response: Landing[]) => {
                this.landings = response;
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

    trackId(index: number, item: Landing) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/landing/new');
    }

    edit(item: IonItemSliding, landing: Landing) {
        this.navController.navigateForward('/tabs/entities/landing/' + landing.id + '/edit');
        item.close();
    }

    async delete(landing) {
        this.landingService.delete(landing.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Landing deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(landing: Landing) {
        this.navController.navigateForward('/tabs/entities/landing/' + landing.id + '/view');
    }
}
