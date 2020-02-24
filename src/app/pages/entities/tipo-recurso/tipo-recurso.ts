import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { TipoRecurso } from './tipo-recurso.model';
import { TipoRecursoService } from './tipo-recurso.service';

@Component({
    selector: 'page-tipo-recurso',
    templateUrl: 'tipo-recurso.html'
})
export class TipoRecursoPage {
    tipoRecursos: TipoRecurso[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private tipoRecursoService: TipoRecursoService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.tipoRecursos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.tipoRecursoService.query().pipe(
            filter((res: HttpResponse<TipoRecurso[]>) => res.ok),
            map((res: HttpResponse<TipoRecurso[]>) => res.body)
        )
        .subscribe(
            (response: TipoRecurso[]) => {
                this.tipoRecursos = response;
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

    trackId(index: number, item: TipoRecurso) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/tipo-recurso/new');
    }

    edit(item: IonItemSliding, tipoRecurso: TipoRecurso) {
        this.navController.navigateForward('/tabs/entities/tipo-recurso/' + tipoRecurso.id + '/edit');
        item.close();
    }

    async delete(tipoRecurso) {
        this.tipoRecursoService.delete(tipoRecurso.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'TipoRecurso deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(tipoRecurso: TipoRecurso) {
        this.navController.navigateForward('/tabs/entities/tipo-recurso/' + tipoRecurso.id + '/view');
    }
}
