import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Invitados } from './invitados.model';
import { InvitadosService } from './invitados.service';

@Component({
    selector: 'page-invitados',
    templateUrl: 'invitados.html'
})
export class InvitadosPage {
    invitados: Invitados[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private invitadosService: InvitadosService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.invitados = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.invitadosService.query().pipe(
            filter((res: HttpResponse<Invitados[]>) => res.ok),
            map((res: HttpResponse<Invitados[]>) => res.body)
        )
        .subscribe(
            (response: Invitados[]) => {
                this.invitados = response;
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

    trackId(index: number, item: Invitados) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/invitados/new');
    }

    edit(item: IonItemSliding, invitados: Invitados) {
        this.navController.navigateForward('/tabs/entities/invitados/' + invitados.id + '/edit');
        item.close();
    }

    async delete(invitados) {
        this.invitadosService.delete(invitados.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Invitados deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(invitados: Invitados) {
        this.navController.navigateForward('/tabs/entities/invitados/' + invitados.id + '/view');
    }
}
