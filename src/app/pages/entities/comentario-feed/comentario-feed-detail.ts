import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { ComentarioFeed } from './comentario-feed.model';
import { ComentarioFeedService } from './comentario-feed.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-comentario-feed-detail',
    templateUrl: 'comentario-feed-detail.html'
})
export class ComentarioFeedDetailPage implements OnInit {
    comentarioFeed: ComentarioFeed = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private comentarioFeedService: ComentarioFeedService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.comentarioFeed = response.data;
        });
    }

    open(item: ComentarioFeed) {
        this.navController.navigateForward('/tabs/entities/comentario-feed/' + item.id + '/edit');
    }

    async deleteModal(item: ComentarioFeed) {
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
                        this.comentarioFeedService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/comentario-feed');
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
