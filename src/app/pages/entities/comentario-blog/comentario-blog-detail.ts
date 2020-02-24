import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { ComentarioBlog } from './comentario-blog.model';
import { ComentarioBlogService } from './comentario-blog.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-comentario-blog-detail',
    templateUrl: 'comentario-blog-detail.html'
})
export class ComentarioBlogDetailPage implements OnInit {
    comentarioBlog: ComentarioBlog = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private comentarioBlogService: ComentarioBlogService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.comentarioBlog = response.data;
        });
    }

    open(item: ComentarioBlog) {
        this.navController.navigateForward('/tabs/entities/comentario-blog/' + item.id + '/edit');
    }

    async deleteModal(item: ComentarioBlog) {
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
                        this.comentarioBlogService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/comentario-blog');
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
