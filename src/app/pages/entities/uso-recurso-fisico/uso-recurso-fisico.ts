import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { UsoRecursoFisico } from './uso-recurso-fisico.model';
import { UsoRecursoFisicoService } from './uso-recurso-fisico.service';

@Component({
    selector: 'page-uso-recurso-fisico',
    templateUrl: 'uso-recurso-fisico.html'
})
export class UsoRecursoFisicoPage {
    usoRecursoFisicos: UsoRecursoFisico[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private usoRecursoFisicoService: UsoRecursoFisicoService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.usoRecursoFisicos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.usoRecursoFisicoService.query().pipe(
            filter((res: HttpResponse<UsoRecursoFisico[]>) => res.ok),
            map((res: HttpResponse<UsoRecursoFisico[]>) => res.body)
        )
        .subscribe(
            (response: UsoRecursoFisico[]) => {
                this.usoRecursoFisicos = response;
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

    trackId(index: number, item: UsoRecursoFisico) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/uso-recurso-fisico/new');
    }

    edit(item: IonItemSliding, usoRecursoFisico: UsoRecursoFisico) {
        this.navController.navigateForward('/tabs/entities/uso-recurso-fisico/' + usoRecursoFisico.id + '/edit');
        item.close();
    }

    async delete(usoRecursoFisico) {
        this.usoRecursoFisicoService.delete(usoRecursoFisico.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'UsoRecursoFisico deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(usoRecursoFisico: UsoRecursoFisico) {
        this.navController.navigateForward('/tabs/entities/uso-recurso-fisico/' + usoRecursoFisico.id + '/view');
    }
}
