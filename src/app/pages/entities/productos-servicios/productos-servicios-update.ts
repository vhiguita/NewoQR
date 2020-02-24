import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductosServicios } from './productos-servicios.model';
import { ProductosServiciosService } from './productos-servicios.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-productos-servicios-update',
    templateUrl: 'productos-servicios-update.html'
})
export class ProductosServiciosUpdatePage implements OnInit {

    productosServicios: ProductosServicios;
    users: User[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombreProducto: [null, [Validators.required]],
        descripcion: [null, [Validators.required]],
        inventariables: ['false', []],
        valor: [null, [Validators.required]],
        impuesto: [null, [Validators.required]],
        video: [null, []],
        imagen1: [null, []],
        imagen1ContentType: [null, []],
        imagen2: [null, []],
        imagen2ContentType: [null, []],
        imagen3: [null, []],
        imagen3ContentType: [null, []],
        imagen4: [null, []],
        imagen4ContentType: [null, []],
        imagen5: [null, []],
        imagen5ContentType: [null, []],
        imagen6: [null, []],
        imagen6ContentType: [null, []],
        web: [null, []],
        user: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,

        private elementRef: ElementRef,
        private camera: Camera,
        private userService: UserService,
        private productosServiciosService: ProductosServiciosService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

        // Set the Camera options
        this.cameraOptions = {
            quality: 100,
            targetWidth: 900,
            targetHeight: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: 1
        };
    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.productosServicios = response.data;
            this.isNew = this.productosServicios.id === null || this.productosServicios.id === undefined;
        });
    }

    updateForm(productosServicios: ProductosServicios) {
        this.form.patchValue({
            id: productosServicios.id,
            nombreProducto: productosServicios.nombreProducto,
            descripcion: productosServicios.descripcion,
            inventariables: productosServicios.inventariables,
            valor: productosServicios.valor,
            impuesto: productosServicios.impuesto,
            video: productosServicios.video,
            imagen1: productosServicios.imagen1,
            imagen1ContentType: productosServicios.imagen1ContentType,
            imagen2: productosServicios.imagen2,
            imagen2ContentType: productosServicios.imagen2ContentType,
            imagen3: productosServicios.imagen3,
            imagen3ContentType: productosServicios.imagen3ContentType,
            imagen4: productosServicios.imagen4,
            imagen4ContentType: productosServicios.imagen4ContentType,
            imagen5: productosServicios.imagen5,
            imagen5ContentType: productosServicios.imagen5ContentType,
            imagen6: productosServicios.imagen6,
            imagen6ContentType: productosServicios.imagen6ContentType,
            web: productosServicios.web,
            user: productosServicios.user,
        });
    }

    save() {
        this.isSaving = true;
        const productosServicios = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.productosServiciosService.update(productosServicios));
        } else {
            this.subscribeToSaveResponse(this.productosServiciosService.create(productosServicios));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ProductosServicios>>) {
        result.subscribe((res: HttpResponse<ProductosServicios>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ProductosServicios ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/productos-servicios');
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

    private createFromForm(): ProductosServicios {
        return {
            ...new ProductosServicios(),
            id: this.form.get(['id']).value,
            nombreProducto: this.form.get(['nombreProducto']).value,
            descripcion: this.form.get(['descripcion']).value,
            inventariables: this.form.get(['inventariables']).value,
            valor: this.form.get(['valor']).value,
            impuesto: this.form.get(['impuesto']).value,
            video: this.form.get(['video']).value,
            imagen1: this.form.get(['imagen1']).value,
            imagen1ContentType: this.form.get(['imagen1ContentType']).value,
            imagen2: this.form.get(['imagen2']).value,
            imagen2ContentType: this.form.get(['imagen2ContentType']).value,
            imagen3: this.form.get(['imagen3']).value,
            imagen3ContentType: this.form.get(['imagen3ContentType']).value,
            imagen4: this.form.get(['imagen4']).value,
            imagen4ContentType: this.form.get(['imagen4ContentType']).value,
            imagen5: this.form.get(['imagen5']).value,
            imagen5ContentType: this.form.get(['imagen5ContentType']).value,
            imagen6: this.form.get(['imagen6']).value,
            imagen6ContentType: this.form.get(['imagen6ContentType']).value,
            web: this.form.get(['web']).value,
            user: this.form.get(['user']).value,
        };
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        this.processWebImage(event, field);
    }

    getPicture(fieldName) {
        if (Camera.installed()) {
            this.camera.getPicture(this.cameraOptions).then((data) => {
                this.productosServicios[fieldName] = data;
                this.productosServicios[fieldName + 'ContentType'] = 'image/jpeg';
                this.form.patchValue({ [fieldName]: data });
                this.form.patchValue({ [fieldName + 'ContentType']: 'image/jpeg' });
            }, (err) => {
                alert('Unable to take photo');
            });
        } else {
            //this.fileInput.nativeElement.click();
        }
    }

    processWebImage(event, fieldName) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {

            let imageData = (readerEvent.target as any).result;
            const imageType = event.target.files[0].type;
            imageData = imageData.substring(imageData.indexOf(',') + 1);

            this.form.patchValue({ [fieldName]: imageData });
            this.form.patchValue({ [fieldName + 'ContentType']: imageType });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.productosServicios, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
