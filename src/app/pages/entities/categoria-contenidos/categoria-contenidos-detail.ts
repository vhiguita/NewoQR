import { Component, OnInit } from '@angular/core';
import { CategoriaContenidos } from './categoria-contenidos.model';
import { CategoriaContenidosService } from './categoria-contenidos.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-categoria-contenidos-detail',
    templateUrl: 'categoria-contenidos-detail.html'
})
export class CategoriaContenidosDetailPage implements OnInit {
    categoriaContenidos: CategoriaContenidos = {};

    constructor(
        private navController: NavController,
        private categoriaContenidosService: CategoriaContenidosService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.categoriaContenidos = response.data;
        });
    }

    open(item: CategoriaContenidos) {
        this.navController.navigateForward('/tabs/entities/categoria-contenidos/' + item.id + '/edit');
    }

    async deleteModal(item: CategoriaContenidos) {
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
                        this.categoriaContenidosService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/categoria-contenidos');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
