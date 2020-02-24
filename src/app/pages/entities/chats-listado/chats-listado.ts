import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ChatsListado } from './chats-listado.model';
import { ChatsListadoService } from './chats-listado.service';

@Component({
    selector: 'page-chats-listado',
    templateUrl: 'chats-listado.html'
})
export class ChatsListadoPage {
    chatsListados: ChatsListado[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private chatsListadoService: ChatsListadoService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.chatsListados = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.chatsListadoService.query().pipe(
            filter((res: HttpResponse<ChatsListado[]>) => res.ok),
            map((res: HttpResponse<ChatsListado[]>) => res.body)
        )
        .subscribe(
            (response: ChatsListado[]) => {
                this.chatsListados = response;
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

    trackId(index: number, item: ChatsListado) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/chats-listado/new');
    }

    edit(item: IonItemSliding, chatsListado: ChatsListado) {
        this.navController.navigateForward('/tabs/entities/chats-listado/' + chatsListado.id + '/edit');
        item.close();
    }

    async delete(chatsListado) {
        this.chatsListadoService.delete(chatsListado.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ChatsListado deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(chatsListado: ChatsListado) {
        this.navController.navigateForward('/tabs/entities/chats-listado/' + chatsListado.id + '/view');
    }
}
