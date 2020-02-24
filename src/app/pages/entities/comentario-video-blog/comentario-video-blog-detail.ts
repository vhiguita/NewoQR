import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { ComentarioVideoBlog } from './comentario-video-blog.model';
import { ComentarioVideoBlogService } from './comentario-video-blog.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-comentario-video-blog-detail',
    templateUrl: 'comentario-video-blog-detail.html'
})
export class ComentarioVideoBlogDetailPage implements OnInit {
    comentarioVideoBlog: ComentarioVideoBlog = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private comentarioVideoBlogService: ComentarioVideoBlogService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.comentarioVideoBlog = response.data;
        });
    }

    open(item: ComentarioVideoBlog) {
        this.navController.navigateForward('/tabs/entities/comentario-video-blog/' + item.id + '/edit');
    }

    async deleteModal(item: ComentarioVideoBlog) {
        const alert = await this.alertController.create({
            header: 'Confirm the deletion?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.comentarioVideoBlogService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/comentario-video-blog');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

}
