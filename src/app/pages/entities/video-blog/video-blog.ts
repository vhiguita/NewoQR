import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { VideoBlog } from './video-blog.model';
import { VideoBlogService } from './video-blog.service';

@Component({
    selector: 'page-video-blog',
    templateUrl: 'video-blog.html'
})
export class VideoBlogPage {
    videoBlogs: VideoBlog[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private videoBlogService: VideoBlogService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.videoBlogs = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.videoBlogService.query().pipe(
            filter((res: HttpResponse<VideoBlog[]>) => res.ok),
            map((res: HttpResponse<VideoBlog[]>) => res.body)
        )
        .subscribe(
            (response: VideoBlog[]) => {
                this.videoBlogs = response;
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

    trackId(index: number, item: VideoBlog) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/video-blog/new');
    }

    edit(item: IonItemSliding, videoBlog: VideoBlog) {
        this.navController.navigateForward('/tabs/entities/video-blog/' + videoBlog.id + '/edit');
        item.close();
    }

    async delete(videoBlog) {
        this.videoBlogService.delete(videoBlog.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'VideoBlog deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(videoBlog: VideoBlog) {
        this.navController.navigateForward('/tabs/entities/video-blog/' + videoBlog.id + '/view');
    }
}
