import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { Sedes } from './sedes.model';
import { SedesService } from './sedes.service';

@Component({
    selector: 'page-sedes',
    templateUrl: 'sedes.html'
})
export class SedesPage {
    sedes: Sedes[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private sedesService: SedesService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.sedes = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.sedesService.query().pipe(
            filter((res: HttpResponse<Sedes[]>) => res.ok),
            map((res: HttpResponse<Sedes[]>) => res.body)
        )
        .subscribe(
            (response: Sedes[]) => {
                this.sedes = response;
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

    trackId(index: number, item: Sedes) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/sedes/new');
    }

    edit(item: IonItemSliding, sedes: Sedes) {
        this.navController.navigateForward('/tabs/entities/sedes/' + sedes.id + '/edit');
        item.close();
    }

    async delete(sedes) {
        this.sedesService.delete(sedes.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Sedes deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(sedes: Sedes) {
        this.navController.navigateForward('/tabs/entities/sedes/' + sedes.id + '/view');
    }
}
