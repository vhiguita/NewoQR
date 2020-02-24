import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { VideoBlog } from './video-blog.model';
import { VideoBlogService } from './video-blog.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-video-blog-detail',
    templateUrl: 'video-blog-detail.html'
})
export class VideoBlogDetailPage implements OnInit {
    videoBlog: VideoBlog = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private videoBlogService: VideoBlogService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.videoBlog = response.data;
        });
    }

    open(item: VideoBlog) {
        this.navController.navigateForward('/tabs/entities/video-blog/' + item.id + '/edit');
    }

    async deleteModal(item: VideoBlog) {
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
                        this.videoBlogService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/video-blog');
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
