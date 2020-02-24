import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Landing } from './landing.model';
import { LandingService } from './landing.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-landing-detail',
    templateUrl: 'landing-detail.html'
})
export class LandingDetailPage implements OnInit {
    landing: Landing = {};

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private landingService: LandingService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.landing = response.data;
        });
    }

    open(item: Landing) {
        this.navController.navigateForward('/tabs/entities/landing/' + item.id + '/edit');
    }

    async deleteModal(item: Landing) {
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
                        this.landingService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/landing');
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
