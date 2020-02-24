import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { HostSede } from './host-sede.model';
import { HostSedeService } from './host-sede.service';

@Component({
    selector: 'page-host-sede',
    templateUrl: 'host-sede.html'
})
export class HostSedePage {
    hostSedes: HostSede[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private hostSedeService: HostSedeService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.hostSedes = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.hostSedeService.query().pipe(
            filter((res: HttpResponse<HostSede[]>) => res.ok),
            map((res: HttpResponse<HostSede[]>) => res.body)
        )
        .subscribe(
            (response: HostSede[]) => {
                this.hostSedes = response;
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

    trackId(index: number, item: HostSede) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/host-sede/new');
    }

    edit(item: IonItemSliding, hostSede: HostSede) {
        this.navController.navigateForward('/tabs/entities/host-sede/' + hostSede.id + '/edit');
        item.close();
    }

    async delete(hostSede) {
        this.hostSedeService.delete(hostSede.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'HostSede deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(hostSede: HostSede) {
        this.navController.navigateForward('/tabs/entities/host-sede/' + hostSede.id + '/view');
    }
}
