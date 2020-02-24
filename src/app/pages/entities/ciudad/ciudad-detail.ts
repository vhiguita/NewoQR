import { Component, OnInit } from '@angular/core';
import { Ciudad } from './ciudad.model';
import { CiudadService } from './ciudad.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-ciudad-detail',
    templateUrl: 'ciudad-detail.html'
})
export class CiudadDetailPage implements OnInit {
    ciudad: Ciudad = {};

    constructor(
        private navController: NavController,
        private ciudadService: CiudadService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.ciudad = response.data;
        });
    }

    open(item: Ciudad) {
        this.navController.navigateForward('/tabs/entities/ciudad/' + item.id + '/edit');
    }

    async deleteModal(item: Ciudad) {
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
                        this.ciudadService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/ciudad');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
