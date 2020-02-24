import { Component, OnInit } from '@angular/core';
import { MargenNewoBlog } from './margen-newo-blog.model';
import { MargenNewoBlogService } from './margen-newo-blog.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-margen-newo-blog-detail',
    templateUrl: 'margen-newo-blog-detail.html'
})
export class MargenNewoBlogDetailPage implements OnInit {
    margenNewoBlog: MargenNewoBlog = {};

    constructor(
        private navController: NavController,
        private margenNewoBlogService: MargenNewoBlogService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.margenNewoBlog = response.data;
        });
    }

    open(item: MargenNewoBlog) {
        this.navController.navigateForward('/tabs/entities/margen-newo-blog/' + item.id + '/edit');
    }

    async deleteModal(item: MargenNewoBlog) {
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
                        this.margenNewoBlogService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/margen-newo-blog');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
