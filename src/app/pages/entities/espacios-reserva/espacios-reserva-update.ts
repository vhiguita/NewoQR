import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EspaciosReserva } from './espacios-reserva.model';
import { EspaciosReservaService } from './espacios-reserva.service';
import { Sedes, SedesService } from '../sedes';

@Component({
    selector: 'page-espacios-reserva-update',
    templateUrl: 'espacios-reserva-update.html'
})
export class EspaciosReservaUpdatePage implements OnInit {

    espaciosReserva: EspaciosReserva;
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
        capacidad: [null, [Validators.required]],
        apertura: [null, [Validators.required]],
        cierre: [null, [Validators.required]],
        wifi: [null, []],
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
        tarifa1Hora: [null, []],
        tarifa2Hora: [null, []],
        tarifa3Hora: [null, []],
        tarifa4Hora: [null, []],
        tarifa5Hora: [null, []],
        tarifa6Hora: [null, []],
        tarifa7Hora: [null, []],
        tarifa8Hora: [null, []],
        impuesto: [null, []],
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
        private espaciosReservaService: EspaciosReservaService
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
            this.espaciosReserva = response.data;
            this.isNew = this.espaciosReserva.id === null || this.espaciosReserva.id === undefined;
        });
    }

    updateForm(espaciosReserva: EspaciosReserva) {
        this.form.patchValue({
            id: espaciosReserva.id,
            nombre: espaciosReserva.nombre,
            descripcion: espaciosReserva.descripcion,
            facilidades: espaciosReserva.facilidades,
            capacidad: espaciosReserva.capacidad,
            apertura: espaciosReserva.apertura,
            cierre: espaciosReserva.cierre,
            wifi: espaciosReserva.wifi,
            video: espaciosReserva.video,
            imagen1: espaciosReserva.imagen1,
            imagen1ContentType: espaciosReserva.imagen1ContentType,
            imagen2: espaciosReserva.imagen2,
            imagen2ContentType: espaciosReserva.imagen2ContentType,
            imagen3: espaciosReserva.imagen3,
            imagen3ContentType: espaciosReserva.imagen3ContentType,
            imagen4: espaciosReserva.imagen4,
            imagen4ContentType: espaciosReserva.imagen4ContentType,
            imagen5: espaciosReserva.imagen5,
            imagen5ContentType: espaciosReserva.imagen5ContentType,
            imagen6: espaciosReserva.imagen6,
            imagen6ContentType: espaciosReserva.imagen6ContentType,
            tarifa1Hora: espaciosReserva.tarifa1Hora,
            tarifa2Hora: espaciosReserva.tarifa2Hora,
            tarifa3Hora: espaciosReserva.tarifa3Hora,
            tarifa4Hora: espaciosReserva.tarifa4Hora,
            tarifa5Hora: espaciosReserva.tarifa5Hora,
            tarifa6Hora: espaciosReserva.tarifa6Hora,
            tarifa7Hora: espaciosReserva.tarifa7Hora,
            tarifa8Hora: espaciosReserva.tarifa8Hora,
            impuesto: espaciosReserva.impuesto,
            sede: espaciosReserva.sede,
        });
    }

    save() {
        this.isSaving = true;
        const espaciosReserva = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.espaciosReservaService.update(espaciosReserva));
        } else {
            this.subscribeToSaveResponse(this.espaciosReservaService.create(espaciosReserva));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<EspaciosReserva>>) {
        result.subscribe((res: HttpResponse<EspaciosReserva>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `EspaciosReserva ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/espacios-reserva');
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

    private createFromForm(): EspaciosReserva {
        return {
            ...new EspaciosReserva(),
            id: this.form.get(['id']).value,
            nombre: this.form.get(['nombre']).value,
            descripcion: this.form.get(['descripcion']).value,
            facilidades: this.form.get(['facilidades']).value,
            capacidad: this.form.get(['capacidad']).value,
            apertura: this.form.get(['apertura']).value,
            cierre: this.form.get(['cierre']).value,
            wifi: this.form.get(['wifi']).value,
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
            tarifa1Hora: this.form.get(['tarifa1Hora']).value,
            tarifa2Hora: this.form.get(['tarifa2Hora']).value,
            tarifa3Hora: this.form.get(['tarifa3Hora']).value,
            tarifa4Hora: this.form.get(['tarifa4Hora']).value,
            tarifa5Hora: this.form.get(['tarifa5Hora']).value,
            tarifa6Hora: this.form.get(['tarifa6Hora']).value,
            tarifa7Hora: this.form.get(['tarifa7Hora']).value,
            tarifa8Hora: this.form.get(['tarifa8Hora']).value,
            impuesto: this.form.get(['impuesto']).value,
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
                this.espaciosReserva[fieldName] = data;
                this.espaciosReserva[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.espaciosReserva, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareSedes(first: Sedes, second: Sedes): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackSedesById(index: number, item: Sedes) {
        return item.id;
    }
}
