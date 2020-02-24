import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MargenNewoBlog } from './margen-newo-blog.model';
import { MargenNewoBlogService } from './margen-newo-blog.service';

@Component({
    selector: 'page-margen-newo-blog',
    templateUrl: 'margen-newo-blog.html'
})
export class MargenNewoBlogPage {
    margenNewoBlogs: MargenNewoBlog[];

    // todo: add pagination

    constructor(
        private navController: NavController,
        private margenNewoBlogService: MargenNewoBlogService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.margenNewoBlogs = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.margenNewoBlogService.query().pipe(
            filter((res: HttpResponse<MargenNewoBlog[]>) => res.ok),
            map((res: HttpResponse<MargenNewoBlog[]>) => res.body)
        )
        .subscribe(
            (response: MargenNewoBlog[]) => {
                this.margenNewoBlogs = response;
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

    trackId(index: number, item: MargenNewoBlog) {
        return item.id;
    }

    new() {
        this.navController.navigateForward('/tabs/entities/margen-newo-blog/new');
    }

    edit(item: IonItemSliding, margenNewoBlog: MargenNewoBlog) {
        this.navController.navigateForward('/tabs/entities/margen-newo-blog/' + margenNewoBlog.id + '/edit');
        item.close();
    }

    async delete(margenNewoBlog) {
        this.margenNewoBlogService.delete(margenNewoBlog.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'MargenNewoBlog deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(margenNewoBlog: MargenNewoBlog) {
        this.navController.navigateForward('/tabs/entities/margen-newo-blog/' + margenNewoBlog.id + '/view');
    }
}
