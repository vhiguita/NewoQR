import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { Evento } from './evento.model';
import { EventoService } from './evento.service';

@Component({
    selector: 'page-evento',
    templateUrl: 'evento.html'
})
export class EventoPage {
    eventos: Evento[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private eventoService: EventoService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.eventos = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.eventoService.query().pipe(
            filter((res: HttpResponse<Evento[]>) => res.ok),
            map((res: HttpResponse<Evento[]>) => res.body)
        )
        .subscribe(
            (response: Evento[]) => {
                this.eventos = response;
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

    trackId(index: number, item: Evento) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/evento/new');
    }

    edit(item: IonItemSliding, evento: Evento) {
        this.navController.navigateForward('/tabs/entities/evento/' + evento.id + '/edit');
        item.close();
    }

    async delete(evento) {
        this.eventoService.delete(evento.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Evento deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(evento: Evento) {
        this.navController.navigateForward('/tabs/entities/evento/' + evento.id + '/view');
    }
}
