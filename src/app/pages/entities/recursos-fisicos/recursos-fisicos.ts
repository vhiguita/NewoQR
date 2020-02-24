import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { RecursosFisicos } from './recursos-fisicos.model';
import { RecursosFisicosService } from './recursos-fisicos.service';

@Component({
    selector: 'page-recursos-fisicos',
    templateUrl: 'recursos-fisicos.html'
})
export class RecursosFisicosPage {
    recursosFisicos: RecursosFisicos[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private recursosFisicosService: RecursosFisicosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.recursosFisicos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.recursosFisicosService.query().pipe(
            filter((res: HttpResponse<RecursosFisicos[]>) => res.ok),
            map((res: HttpResponse<RecursosFisicos[]>) => res.body)
        )
        .subscribe(
            (response: RecursosFisicos[]) => {
                this.recursosFisicos = response;
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

    trackId(index: number, item: RecursosFisicos) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/recursos-fisicos/new');
    }

    edit(item: IonItemSliding, recursosFisicos: RecursosFisicos) {
        this.navController.navigateForward('/tabs/entities/recursos-fisicos/' + recursosFisicos.id + '/edit');
        item.close();
    }

    async delete(recursosFisicos) {
        this.recursosFisicosService.delete(recursosFisicos.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'RecursosFisicos deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(recursosFisicos: RecursosFisicos) {
        this.navController.navigateForward('/tabs/entities/recursos-fisicos/' + recursosFisicos.id + '/view');
    }
}
