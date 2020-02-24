import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { Miembros } from './miembros.model';
import { MiembrosService } from './miembros.service';

@Component({
    selector: 'page-miembros',
    templateUrl: 'miembros.html'
})
export class MiembrosPage {
    miembros: Miembros[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private miembrosService: MiembrosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.miembros = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.miembrosService.query().pipe(
            filter((res: HttpResponse<Miembros[]>) => res.ok),
            map((res: HttpResponse<Miembros[]>) => res.body)
        )
        .subscribe(
            (response: Miembros[]) => {
                this.miembros = response;
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

    trackId(index: number, item: Miembros) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/miembros/new');
    }

    edit(item: IonItemSliding, miembros: Miembros) {
        this.navController.navigateForward('/tabs/entities/miembros/' + miembros.id + '/edit');
        item.close();
    }

    async delete(miembros) {
        this.miembrosService.delete(miembros.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Miembros deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(miembros: Miembros) {
        this.navController.navigateForward('/tabs/entities/miembros/' + miembros.id + '/view');
    }
}
