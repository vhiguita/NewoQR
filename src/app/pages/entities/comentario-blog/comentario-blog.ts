import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { ComentarioBlog } from './comentario-blog.model';
import { ComentarioBlogService } from './comentario-blog.service';

@Component({
    selector: 'page-comentario-blog',
    templateUrl: 'comentario-blog.html'
})
export class ComentarioBlogPage {
    comentarioBlogs: ComentarioBlog[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private comentarioBlogService: ComentarioBlogService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.comentarioBlogs = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.comentarioBlogService.query().pipe(
            filter((res: HttpResponse<ComentarioBlog[]>) => res.ok),
            map((res: HttpResponse<ComentarioBlog[]>) => res.body)
        )
        .subscribe(
            (response: ComentarioBlog[]) => {
                this.comentarioBlogs = response;
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

    trackId(index: number, item: ComentarioBlog) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/comentario-blog/new');
    }

    edit(item: IonItemSliding, comentarioBlog: ComentarioBlog) {
        this.navController.navigateForward('/tabs/entities/comentario-blog/' + comentarioBlog.id + '/edit');
        item.close();
    }

    async delete(comentarioBlog) {
        this.comentarioBlogService.delete(comentarioBlog.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'ComentarioBlog deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(comentarioBlog: ComentarioBlog) {
        this.navController.navigateForward('/tabs/entities/comentario-blog/' + comentarioBlog.id + '/view');
    }
}
