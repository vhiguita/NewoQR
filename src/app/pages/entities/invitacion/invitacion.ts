import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Invitacion } from './invitacion.model';
import { InvitacionService } from './invitacion.service';

@Component({
    selector: 'page-invitacion',
    templateUrl: 'invitacion.html'
})
export class InvitacionPage {
    invitacions: Invitacion[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private invitacionService: InvitacionService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.invitacions = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.invitacionService.query().pipe(
            filter((res: HttpResponse<Invitacion[]>) => res.ok),
            map((res: HttpResponse<Invitacion[]>) => res.body)
        )
        .subscribe(
            (response: Invitacion[]) => {
                this.invitacions = response;
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

    trackId(index: number, item: Invitacion) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/invitacion/new');
    }

    edit(item: IonItemSliding, invitacion: Invitacion) {
        this.navController.navigateForward('/tabs/entities/invitacion/' + invitacion.id + '/edit');
        item.close();
    }

    async delete(invitacion) {
        this.invitacionService.delete(invitacion.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Invitacion deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(invitacion: Invitacion) {
        this.navController.navigateForward('/tabs/entities/invitacion/' + invitacion.id + '/view');
    }
}
