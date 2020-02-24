import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';

@Component({
    selector: 'page-empresa',
    templateUrl: 'empresa.html'
})
export class EmpresaPage {
    empresas: Empresa[];

    // todo: add pagination

    constructor(
        private dataUtils: JhiDataUtils,
        private navController: NavController,
        private empresaService: EmpresaService,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.empresas = [];
    }

    ionViewWillEnter() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.empresaService.query().pipe(
            filter((res: HttpResponse<Empresa[]>) => res.ok),
            map((res: HttpResponse<Empresa[]>) => res.body)
        )
        .subscribe(
            (response: Empresa[]) => {
                this.empresas = response;
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

    trackId(index: number, item: Empresa) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    new() {
        this.navController.navigateForward('/tabs/entities/empresa/new');
    }

    edit(item: IonItemSliding, empresa: Empresa) {
        this.navController.navigateForward('/tabs/entities/empresa/' + empresa.id + '/edit');
        item.close();
    }

    async delete(empresa) {
        this.empresaService.delete(empresa.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: 'Empresa deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    view(empresa: Empresa) {
        this.navController.navigateForward('/tabs/entities/empresa/' + empresa.id + '/view');
    }
}
