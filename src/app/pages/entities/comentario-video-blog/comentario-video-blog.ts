import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { ComentarioVideoBlog } from './comentario-video-blog.model';
import { ComentarioVideoBlogService } from './comentario-video-blog.service';

@Component({
    selector: 'page-comentario-video-blog',
    templateUrl: 'comentario-video-blog.html'
})
export class ComentarioVideoBlogPage {
    comentarioVideoBlogs: ComentarioVideoBlog[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private comentarioVideoBlogService: ComentarioVideoBlogService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.comentarioVideoBlogs = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.comentarioVideoBlogService.query().pipe(
            filter((res: HttpResponse<ComentarioVideoBlog[]>) => res.ok),
            map((res: HttpResponse<ComentarioVideoBlog[]>) => res.body)
        )
        .subscribe(
            (response: ComentarioVideoBlog[]) => {
                this.comentarioVideoBlogs = response;
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

    trackId(index: number, item: ComentarioVideoBlog) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/comentario-video-blog/new');
    }

    edit(item: IonItemSliding, comentarioVideoBlog: ComentarioVideoBlog) {
        this.navController.navigateForward('/tabs/entities/comentario-video-blog/' + comentarioVideoBlog.id + '/edit');
        item.close();
    }

    async delete(comentarioVideoBlog) {
        this.comentarioVideoBlogService.delete(comentarioVideoBlog.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ComentarioVideoBlog deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(comentarioVideoBlog: ComentarioVideoBlog) {
        this.navController.navigateForward('/tabs/entities/comentario-video-blog/' + comentarioVideoBlog.id + '/view');
    }
}
