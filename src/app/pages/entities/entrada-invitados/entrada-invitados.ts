import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { EntradaInvitados } from './entrada-invitados.model';
import { EntradaInvitadosService } from './entrada-invitados.service';

@Component({
    selector: 'page-entrada-invitados',
    templateUrl: 'entrada-invitados.html'
})
export class EntradaInvitadosPage {
    entradaInvitados: EntradaInvitados[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private entradaInvitadosService: EntradaInvitadosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.entradaInvitados = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.entradaInvitadosService.query().pipe(
            filter((res: HttpResponse<EntradaInvitados[]>) => res.ok),
            map((res: HttpResponse<EntradaInvitados[]>) => res.body)
        )
        .subscribe(
            (response: EntradaInvitados[]) => {
                this.entradaInvitados = response;
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

    trackId(index: number, item: EntradaInvitados) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/entrada-invitados/new');
    }

    edit(item: IonItemSliding, entradaInvitados: EntradaInvitados) {
        this.navController.navigateForward('/tabs/entities/entrada-invitados/' + entradaInvitados.id + '/edit');
        item.close();
    }

    async delete(entradaInvitados) {
        this.entradaInvitadosService.delete(entradaInvitados.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'EntradaInvitados deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(entradaInvitados: EntradaInvitados) {
        this.navController.navigateForward('/tabs/entities/entrada-invitados/' + entradaInvitados.id + '/view');
    }
}
