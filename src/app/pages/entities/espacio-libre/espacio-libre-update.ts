import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EspacioLibre } from './espacio-libre.model';
import { EspacioLibreService } from './espacio-libre.service';
import { Sedes, SedesService } from '../sedes';
import { TipoEspacio, TipoEspacioService } from '../tipo-espacio';

@Component({
    selector: 'page-espacio-libre-update',
    templateUrl: 'espacio-libre-update.html'
})
export class EspacioLibreUpdatePage implements OnInit {

    espacioLibre: EspacioLibre;
    sedes: Sedes[];
    tipoEspacios: TipoEspacio[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombre: [null, [Validators.required]],
        capacidadInstalada: [null, [Validators.required]],
        wifi: [null, []],
        tarifa1hMiembro: [null, []],
        tarifa2hMiembro: [null, []],
        tarifa3hMiembro: [null, []],
        tarifa4hMiembro: [null, []],
        tarifa5hMiembro: [null, []],
        tarifa6hMiembro: [null, []],
        tarifa7hMiembro: [null, []],
        tarifa8hMiembro: [null, []],
        tarifa1hInvitado: [null, []],
        tarifa2hInvitado: [null, []],
        tarifa3hInvitado: [null, []],
        tarifa4hInvitado: [null, []],
        tarifa5hInvitado: [null, []],
        tarifa6hInvitado: [null, []],
        tarifa7hInvitado: [null, []],
        tarifa8hInvitado: [null, []],
        impuesto: [null, []],
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
        sede: [null, []],
        tipoEspacio: [null, []],
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
        private tipoEspacioService: TipoEspacioService,
        private espacioLibreService: EspacioLibreService
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
        this.tipoEspacioService.query()
            .subscribe(data => { this.tipoEspacios = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.espacioLibre = response.data;
            this.isNew = this.espacioLibre.id === null || this.espacioLibre.id === undefined;
        });
    }

    updateForm(espacioLibre: EspacioLibre) {
        this.form.patchValue({
            id: espacioLibre.id,
            nombre: espacioLibre.nombre,
            capacidadInstalada: espacioLibre.capacidadInstalada,
            wifi: espacioLibre.wifi,
            tarifa1hMiembro: espacioLibre.tarifa1hMiembro,
            tarifa2hMiembro: espacioLibre.tarifa2hMiembro,
            tarifa3hMiembro: espacioLibre.tarifa3hMiembro,
            tarifa4hMiembro: espacioLibre.tarifa4hMiembro,
            tarifa5hMiembro: espacioLibre.tarifa5hMiembro,
            tarifa6hMiembro: espacioLibre.tarifa6hMiembro,
            tarifa7hMiembro: espacioLibre.tarifa7hMiembro,
            tarifa8hMiembro: espacioLibre.tarifa8hMiembro,
            tarifa1hInvitado: espacioLibre.tarifa1hInvitado,
            tarifa2hInvitado: espacioLibre.tarifa2hInvitado,
            tarifa3hInvitado: espacioLibre.tarifa3hInvitado,
            tarifa4hInvitado: espacioLibre.tarifa4hInvitado,
            tarifa5hInvitado: espacioLibre.tarifa5hInvitado,
            tarifa6hInvitado: espacioLibre.tarifa6hInvitado,
            tarifa7hInvitado: espacioLibre.tarifa7hInvitado,
            tarifa8hInvitado: espacioLibre.tarifa8hInvitado,
            impuesto: espacioLibre.impuesto,
            video: espacioLibre.video,
            imagen1: espacioLibre.imagen1,
            imagen1ContentType: espacioLibre.imagen1ContentType,
            imagen2: espacioLibre.imagen2,
            imagen2ContentType: espacioLibre.imagen2ContentType,
            imagen3: espacioLibre.imagen3,
            imagen3ContentType: espacioLibre.imagen3ContentType,
            imagen4: espacioLibre.imagen4,
            imagen4ContentType: espacioLibre.imagen4ContentType,
            imagen5: espacioLibre.imagen5,
            imagen5ContentType: espacioLibre.imagen5ContentType,
            imagen6: espacioLibre.imagen6,
            imagen6ContentType: espacioLibre.imagen6ContentType,
            sede: espacioLibre.sede,
            tipoEspacio: espacioLibre.tipoEspacio,
        });
    }

    save() {
        this.isSaving = true;
        const espacioLibre = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.espacioLibreService.update(espacioLibre));
        } else {
            this.subscribeToSaveResponse(this.espacioLibreService.create(espacioLibre));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<EspacioLibre>>) {
        result.subscribe((res: HttpResponse<EspacioLibre>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `EspacioLibre ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/espacio-libre');
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

    private createFromForm(): EspacioLibre {
        return {
            ...new EspacioLibre(),
            id: this.form.get(['id']).value,
            nombre: this.form.get(['nombre']).value,
            capacidadInstalada: this.form.get(['capacidadInstalada']).value,
            wifi: this.form.get(['wifi']).value,
            tarifa1hMiembro: this.form.get(['tarifa1hMiembro']).value,
            tarifa2hMiembro: this.form.get(['tarifa2hMiembro']).value,
            tarifa3hMiembro: this.form.get(['tarifa3hMiembro']).value,
            tarifa4hMiembro: this.form.get(['tarifa4hMiembro']).value,
            tarifa5hMiembro: this.form.get(['tarifa5hMiembro']).value,
            tarifa6hMiembro: this.form.get(['tarifa6hMiembro']).value,
            tarifa7hMiembro: this.form.get(['tarifa7hMiembro']).value,
            tarifa8hMiembro: this.form.get(['tarifa8hMiembro']).value,
            tarifa1hInvitado: this.form.get(['tarifa1hInvitado']).value,
            tarifa2hInvitado: this.form.get(['tarifa2hInvitado']).value,
            tarifa3hInvitado: this.form.get(['tarifa3hInvitado']).value,
            tarifa4hInvitado: this.form.get(['tarifa4hInvitado']).value,
            tarifa5hInvitado: this.form.get(['tarifa5hInvitado']).value,
            tarifa6hInvitado: this.form.get(['tarifa6hInvitado']).value,
            tarifa7hInvitado: this.form.get(['tarifa7hInvitado']).value,
            tarifa8hInvitado: this.form.get(['tarifa8hInvitado']).value,
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
            sede: this.form.get(['sede']).value,
            tipoEspacio: this.form.get(['tipoEspacio']).value,
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
                this.espacioLibre[fieldName] = data;
                this.espacioLibre[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.espacioLibre, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareSedes(first: Sedes, second: Sedes): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackSedesById(index: number, item: Sedes) {
        return item.id;
    }
    compareTipoEspacio(first: TipoEspacio, second: TipoEspacio): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTipoEspacioById(index: number, item: TipoEspacio) {
        return item.id;
    }
}
