import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { EspacioLibre } from './espacio-libre.model';
import { EspacioLibreService } from './espacio-libre.service';

@Component({
    selector: 'page-espacio-libre',
    templateUrl: 'espacio-libre.html'
})
export class EspacioLibrePage {
    espacioLibres: EspacioLibre[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private espacioLibreService: EspacioLibreService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.espacioLibres = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.espacioLibreService.query().pipe(
            filter((res: HttpResponse<EspacioLibre[]>) => res.ok),
            map((res: HttpResponse<EspacioLibre[]>) => res.body)
        )
        .subscribe(
            (response: EspacioLibre[]) => {
                this.espacioLibres = response;
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

    trackId(index: number, item: EspacioLibre) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/espacio-libre/new');
    }

    edit(item: IonItemSliding, espacioLibre: EspacioLibre) {
        this.navController.navigateForward('/tabs/entities/espacio-libre/' + espacioLibre.id + '/edit');
        item.close();
    }

    async delete(espacioLibre) {
        this.espacioLibreService.delete(espacioLibre.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'EspacioLibre deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(espacioLibre: EspacioLibre) {
        this.navController.navigateForward('/tabs/entities/espacio-libre/' + espacioLibre.id + '/view');
    }
}
