import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { RegistroFacturacion } from './registro-facturacion.model';
import { RegistroFacturacionService } from './registro-facturacion.service';

@Component({
    selector: 'page-registro-facturacion',
    templateUrl: 'registro-facturacion.html'
})
export class RegistroFacturacionPage {
    registroFacturacions: RegistroFacturacion[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private registroFacturacionService: RegistroFacturacionService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.registroFacturacions = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.registroFacturacionService.query().pipe(
            filter((res: HttpResponse<RegistroFacturacion[]>) => res.ok),
            map((res: HttpResponse<RegistroFacturacion[]>) => res.body)
        )
        .subscribe(
            (response: RegistroFacturacion[]) => {
                this.registroFacturacions = response;
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

    trackId(index: number, item: RegistroFacturacion) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/registro-facturacion/new');
    }

    edit(item: IonItemSliding, registroFacturacion: RegistroFacturacion) {
        this.navController.navigateForward('/tabs/entities/registro-facturacion/' + registroFacturacion.id + '/edit');
        item.close();
    }

    async delete(registroFacturacion) {
        this.registroFacturacionService.delete(registroFacturacion.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'RegistroFacturacion deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(registroFacturacion: RegistroFacturacion) {
        this.navController.navigateForward('/tabs/entities/registro-facturacion/' + registroFacturacion.id + '/view');
    }
}
