import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MargenNewoProductos } from './margen-newo-productos.model';
import { MargenNewoProductosService } from './margen-newo-productos.service';
import { ProductosServicios, ProductosServiciosService } from '../productos-servicios';

@Component({
    selector: 'page-margen-newo-productos-update',
    templateUrl: 'margen-newo-productos-update.html'
})
export class MargenNewoProductosUpdatePage implements OnInit {

    margenNewoProductos: MargenNewoProductos;
    productosServicios: ProductosServicios[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        porcentajeMargen: [null, []],
        producto: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private productosServiciosService: ProductosServiciosService,
        private margenNewoProductosService: MargenNewoProductosService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.productosServiciosService.query()
            .subscribe(data => { this.productosServicios = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.margenNewoProductos = response.data;
            this.isNew = this.margenNewoProductos.id === null || this.margenNewoProductos.id === undefined;
        });
    }

    updateForm(margenNewoProductos: MargenNewoProductos) {
        this.form.patchValue({
            id: margenNewoProductos.id,
            porcentajeMargen: margenNewoProductos.porcentajeMargen,
            producto: margenNewoProductos.producto,
        });
    }

    save() {
        this.isSaving = true;
        const margenNewoProductos = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.margenNewoProductosService.update(margenNewoProductos));
        } else {
            this.subscribeToSaveResponse(this.margenNewoProductosService.create(margenNewoProductos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MargenNewoProductos>>) {
        result.subscribe((res: HttpResponse<MargenNewoProductos>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MargenNewoProductos ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/margen-newo-productos');
    }

    previousState() {
        window.history.back();
    }

    async onError(error) {
        this.isSaving = false;
        console.error(error);
        const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    private createFromForm(): MargenNewoProductos {
        return {
            ...new MargenNewoProductos(),
            id: this.form.get(['id']).value,
            porcentajeMargen: this.form.get(['porcentajeMargen']).value,
            producto: this.form.get(['producto']).value,
        };
    }

    compareProductosServicios(first: ProductosServicios, second: ProductosServicios): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackProductosServiciosById(index: number, item: ProductosServicios) {
        return item.id;
    }
}
