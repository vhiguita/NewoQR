import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Sedes } from './sedes.model';
import { SedesService } from './sedes.service';
import { Ciudad, CiudadService } from '../ciudad';

@Component({
    selector: 'page-sedes-update',
    templateUrl: 'sedes-update.html'
})
export class SedesUpdatePage implements OnInit {

    sedes: Sedes;
    ciudads: Ciudad[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombreSede: [null, [Validators.required]],
        coordenadaX: [null, []],
        coordenadaY: [null, []],
        direccion: [null, [Validators.required]],
        telefonoComunidad: [null, [Validators.required]],
        telefonoNegocio: [null, []],
        descripcionSede: [null, []],
        horario: [null, []],
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
        ciudad: [null, []],
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
        private ciudadService: CiudadService,
        private sedesService: SedesService
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
        this.ciudadService.query()
            .subscribe(data => { this.ciudads = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.sedes = response.data;
            this.isNew = this.sedes.id === null || this.sedes.id === undefined;
        });
    }

    updateForm(sedes: Sedes) {
        this.form.patchValue({
            id: sedes.id,
            nombreSede: sedes.nombreSede,
            coordenadaX: sedes.coordenadaX,
            coordenadaY: sedes.coordenadaY,
            direccion: sedes.direccion,
            telefonoComunidad: sedes.telefonoComunidad,
            telefonoNegocio: sedes.telefonoNegocio,
            descripcionSede: sedes.descripcionSede,
            horario: sedes.horario,
            video: sedes.video,
            imagen1: sedes.imagen1,
            imagen1ContentType: sedes.imagen1ContentType,
            imagen2: sedes.imagen2,
            imagen2ContentType: sedes.imagen2ContentType,
            imagen3: sedes.imagen3,
            imagen3ContentType: sedes.imagen3ContentType,
            imagen4: sedes.imagen4,
            imagen4ContentType: sedes.imagen4ContentType,
            imagen5: sedes.imagen5,
            imagen5ContentType: sedes.imagen5ContentType,
            imagen6: sedes.imagen6,
            imagen6ContentType: sedes.imagen6ContentType,
            ciudad: sedes.ciudad,
        });
    }

    save() {
        this.isSaving = true;
        const sedes = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.sedesService.update(sedes));
        } else {
            this.subscribeToSaveResponse(this.sedesService.create(sedes));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Sedes>>) {
        result.subscribe((res: HttpResponse<Sedes>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Sedes ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/sedes');
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

    private createFromForm(): Sedes {
        return {
            ...new Sedes(),
            id: this.form.get(['id']).value,
            nombreSede: this.form.get(['nombreSede']).value,
            coordenadaX: this.form.get(['coordenadaX']).value,
            coordenadaY: this.form.get(['coordenadaY']).value,
            direccion: this.form.get(['direccion']).value,
            telefonoComunidad: this.form.get(['telefonoComunidad']).value,
            telefonoNegocio: this.form.get(['telefonoNegocio']).value,
            descripcionSede: this.form.get(['descripcionSede']).value,
            horario: this.form.get(['horario']).value,
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
            ciudad: this.form.get(['ciudad']).value,
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
                this.sedes[fieldName] = data;
                this.sedes[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.sedes, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareCiudad(first: Ciudad, second: Ciudad): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCiudadById(index: number, item: Ciudad) {
        return item.id;
    }
}
