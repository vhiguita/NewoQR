import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Landing } from './landing.model';
import { LandingService } from './landing.service';
import { Sedes, SedesService } from '../sedes';

@Component({
    selector: 'page-landing-update',
    templateUrl: 'landing-update.html'
})
export class LandingUpdatePage implements OnInit {

    landing: Landing;
    sedes: Sedes[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombre: [null, [Validators.required]],
        descripcion: [null, [Validators.required]],
        facilidades: [null, [Validators.required]],
        telefonoNegocio: [null, []],
        numeroPuestos: [null, [Validators.required]],
        tarifaMensual: [null, [Validators.required]],
        impuesto: [null, [Validators.required]],
        imagen1: [null, []],
        imagen1ContentType: [null, []],
        imagen2: [null, []],
        imagen2ContentType: [null, []],
        imagen3: [null, []],
        imagen3ContentType: [null, []],
        sede: [null, []],
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
        private sedesService: SedesService,
        private landingService: LandingService
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
        this.sedesService.query()
            .subscribe(data => { this.sedes = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.landing = response.data;
            this.isNew = this.landing.id === null || this.landing.id === undefined;
        });
    }

    updateForm(landing: Landing) {
        this.form.patchValue({
            id: landing.id,
            nombre: landing.nombre,
            descripcion: landing.descripcion,
            facilidades: landing.facilidades,
            telefonoNegocio: landing.telefonoNegocio,
            numeroPuestos: landing.numeroPuestos,
            tarifaMensual: landing.tarifaMensual,
            impuesto: landing.impuesto,
            imagen1: landing.imagen1,
            imagen1ContentType: landing.imagen1ContentType,
            imagen2: landing.imagen2,
            imagen2ContentType: landing.imagen2ContentType,
            imagen3: landing.imagen3,
            imagen3ContentType: landing.imagen3ContentType,
            sede: landing.sede,
        });
    }

    save() {
        this.isSaving = true;
        const landing = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.landingService.update(landing));
        } else {
            this.subscribeToSaveResponse(this.landingService.create(landing));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Landing>>) {
        result.subscribe((res: HttpResponse<Landing>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Landing ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/landing');
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

    private createFromForm(): Landing {
        return {
            ...new Landing(),
            id: this.form.get(['id']).value,
            nombre: this.form.get(['nombre']).value,
            descripcion: this.form.get(['descripcion']).value,
            facilidades: this.form.get(['facilidades']).value,
            telefonoNegocio: this.form.get(['telefonoNegocio']).value,
            numeroPuestos: this.form.get(['numeroPuestos']).value,
            tarifaMensual: this.form.get(['tarifaMensual']).value,
            impuesto: this.form.get(['impuesto']).value,
            imagen1: this.form.get(['imagen1']).value,
            imagen1ContentType: this.form.get(['imagen1ContentType']).value,
            imagen2: this.form.get(['imagen2']).value,
            imagen2ContentType: this.form.get(['imagen2ContentType']).value,
            imagen3: this.form.get(['imagen3']).value,
            imagen3ContentType: this.form.get(['imagen3ContentType']).value,
            sede: this.form.get(['sede']).value,
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
                this.landing[fieldName] = data;
                this.landing[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.landing, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareSedes(first: Sedes, second: Sedes): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackSedesById(index: number, item: Sedes) {
        return item.id;
    }
}
