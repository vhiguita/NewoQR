import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CategoriaContenidos } from './categoria-contenidos.model';
import { CategoriaContenidosService } from './categoria-contenidos.service';

@Component({
    selector: 'page-categoria-contenidos',
    templateUrl: 'categoria-contenidos.html'
})
export class CategoriaContenidosPage {
    categoriaContenidos: CategoriaContenidos[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private categoriaContenidosService: CategoriaContenidosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.categoriaContenidos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.categoriaContenidosService.query().pipe(
            filter((res: HttpResponse<CategoriaContenidos[]>) => res.ok),
            map((res: HttpResponse<CategoriaContenidos[]>) => res.body)
        )
        .subscribe(
            (response: CategoriaContenidos[]) => {
                this.categoriaContenidos = response;
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

    trackId(index: number, item: CategoriaContenidos) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/categoria-contenidos/new');
    }

    edit(item: IonItemSliding, categoriaContenidos: CategoriaContenidos) {
        this.navController.navigateForward('/tabs/entities/categoria-contenidos/' + categoriaContenidos.id + '/edit');
        item.close();
    }

    async delete(categoriaContenidos) {
        this.categoriaContenidosService.delete(categoriaContenidos.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'CategoriaContenidos deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(categoriaContenidos: CategoriaContenidos) {
        this.navController.navigateForward('/tabs/entities/categoria-contenidos/' + categoriaContenidos.id + '/view');
    }
}
