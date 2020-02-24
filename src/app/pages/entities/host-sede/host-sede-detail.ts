import { Component, OnInit } from '@angular/core';
import { HostSede } from './host-sede.model';
import { HostSedeService } from './host-sede.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-host-sede-detail',
    templateUrl: 'host-sede-detail.html'
})
export class HostSedeDetailPage implements OnInit {
    hostSede: HostSede = {};

    constructor(
        private navController: NavController,
        private hostSedeService: HostSedeService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.hostSede = response.data;
        });
    }

    open(item: HostSede) {
        this.navController.navigateForward('/tabs/entities/host-sede/' + item.id + '/edit');
    }

    async deleteModal(item: HostSede) {
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
                        this.hostSedeService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/host-sede');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
