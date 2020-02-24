import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { EntradaMiembros } from './entrada-miembros.model';
import { EntradaMiembrosService } from './entrada-miembros.service';

@Component({
    selector: 'page-entrada-miembros',
    templateUrl: 'entrada-miembros.html'
})
export class EntradaMiembrosPage {
    entradaMiembros: EntradaMiembros[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private entradaMiembrosService: EntradaMiembrosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.entradaMiembros = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.entradaMiembrosService.query().pipe(
            filter((res: HttpResponse<EntradaMiembros[]>) => res.ok),
            map((res: HttpResponse<EntradaMiembros[]>) => res.body)
        )
        .subscribe(
            (response: EntradaMiembros[]) => {
                this.entradaMiembros = response;
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

    trackId(index: number, item: EntradaMiembros) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/entrada-miembros/new');
    }

    edit(item: IonItemSliding, entradaMiembros: EntradaMiembros) {
        this.navController.navigateForward('/tabs/entities/entrada-miembros/' + entradaMiembros.id + '/edit');
        item.close();
    }

    async delete(entradaMiembros) {
        this.entradaMiembrosService.delete(entradaMiembros.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'EntradaMiembros deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(entradaMiembros: EntradaMiembros) {
        this.navController.navigateForward('/tabs/entities/entrada-miembros/' + entradaMiembros.id + '/view');
    }
}
