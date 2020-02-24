import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { ComentarioFeed } from './comentario-feed.model';
import { ComentarioFeedService } from './comentario-feed.service';

@Component({
    selector: 'page-comentario-feed',
    templateUrl: 'comentario-feed.html'
})
export class ComentarioFeedPage {
    comentarioFeeds: ComentarioFeed[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private comentarioFeedService: ComentarioFeedService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.comentarioFeeds = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.comentarioFeedService.query().pipe(
            filter((res: HttpResponse<ComentarioFeed[]>) => res.ok),
            map((res: HttpResponse<ComentarioFeed[]>) => res.body)
        )
        .subscribe(
            (response: ComentarioFeed[]) => {
                this.comentarioFeeds = response;
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

    trackId(index: number, item: ComentarioFeed) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/comentario-feed/new');
    }

    edit(item: IonItemSliding, comentarioFeed: ComentarioFeed) {
        this.navController.navigateForward('/tabs/entities/comentario-feed/' + comentarioFeed.id + '/edit');
        item.close();
    }

    async delete(comentarioFeed) {
        this.comentarioFeedService.delete(comentarioFeed.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ComentarioFeed deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(comentarioFeed: ComentarioFeed) {
        this.navController.navigateForward('/tabs/entities/comentario-feed/' + comentarioFeed.id + '/view');
    }
}
