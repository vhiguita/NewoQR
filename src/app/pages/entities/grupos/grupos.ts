import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { Grupos } from './grupos.model';
import { GruposService } from './grupos.service';

@Component({
    selector: 'page-grupos',
    templateUrl: 'grupos.html'
})
export class GruposPage {
    grupos: Grupos[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private gruposService: GruposService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.grupos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.gruposService.query().pipe(
            filter((res: HttpResponse<Grupos[]>) => res.ok),
            map((res: HttpResponse<Grupos[]>) => res.body)
        )
        .subscribe(
            (response: Grupos[]) => {
                this.grupos = response;
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

    trackId(index: number, item: Grupos) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/grupos/new');
    }

    edit(item: IonItemSliding, grupos: Grupos) {
        this.navController.navigateForward('/tabs/entities/grupos/' + grupos.id + '/edit');
        item.close();
    }

    async delete(grupos) {
        this.gruposService.delete(grupos.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Grupos deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(grupos: Grupos) {
        this.navController.navigateForward('/tabs/entities/grupos/' + grupos.id + '/view');
    }
}
