import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecursosFisicos } from './recursos-fisicos.model';
import { RecursosFisicosService } from './recursos-fisicos.service';
import { Sedes, SedesService } from '../sedes';
import { TipoRecurso, TipoRecursoService } from '../tipo-recurso';

@Component({
    selector: 'page-recursos-fisicos-update',
    templateUrl: 'recursos-fisicos-update.html'
})
export class RecursosFisicosUpdatePage implements OnInit {

    recursosFisicos: RecursosFisicos;
    sedes: Sedes[];
    tipoRecursos: TipoRecurso[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        recurso: [null, [Validators.required]],
        tipo: [null, [Validators.required]],
        unidadMedida: [null, [Validators.required]],
        valorUnitario: [null, [Validators.required]],
        valor1H: [null, []],
        valor2H: [null, []],
        valor3H: [null, []],
        valor4H: [null, []],
        valor5H: [null, []],
        valor6H: [null, []],
        valor7H: [null, []],
        valor8H: [null, []],
        valor9H: [null, []],
        valor10H: [null, []],
        valor11H: [null, []],
        valor12H: [null, []],
        impuesto: [null, []],
        foto: [null, [Validators.required]],
        fotoContentType: [null, []],
        video: [null, []],
        videoContentType: [null, []],
        sede: [null, []],
        tipoRecurso: [null, []],
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
        private tipoRecursoService: TipoRecursoService,
        private recursosFisicosService: RecursosFisicosService
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
        this.tipoRecursoService.query()
            .subscribe(data => { this.tipoRecursos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.recursosFisicos = response.data;
            this.isNew = this.recursosFisicos.id === null || this.recursosFisicos.id === undefined;
        });
    }

    updateForm(recursosFisicos: RecursosFisicos) {
        this.form.patchValue({
            id: recursosFisicos.id,
            recurso: recursosFisicos.recurso,
            tipo: recursosFisicos.tipo,
            unidadMedida: recursosFisicos.unidadMedida,
            valorUnitario: recursosFisicos.valorUnitario,
            valor1H: recursosFisicos.valor1H,
            valor2H: recursosFisicos.valor2H,
            valor3H: recursosFisicos.valor3H,
            valor4H: recursosFisicos.valor4H,
            valor5H: recursosFisicos.valor5H,
            valor6H: recursosFisicos.valor6H,
            valor7H: recursosFisicos.valor7H,
            valor8H: recursosFisicos.valor8H,
            valor9H: recursosFisicos.valor9H,
            valor10H: recursosFisicos.valor10H,
            valor11H: recursosFisicos.valor11H,
            valor12H: recursosFisicos.valor12H,
            impuesto: recursosFisicos.impuesto,
            foto: recursosFisicos.foto,
            fotoContentType: recursosFisicos.fotoContentType,
            video: recursosFisicos.video,
            videoContentType: recursosFisicos.videoContentType,
            sede: recursosFisicos.sede,
            tipoRecurso: recursosFisicos.tipoRecurso,
        });
    }

    save() {
        this.isSaving = true;
        const recursosFisicos = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.recursosFisicosService.update(recursosFisicos));
        } else {
            this.subscribeToSaveResponse(this.recursosFisicosService.create(recursosFisicos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<RecursosFisicos>>) {
        result.subscribe((res: HttpResponse<RecursosFisicos>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `RecursosFisicos ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/recursos-fisicos');
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

    private createFromForm(): RecursosFisicos {
        return {
            ...new RecursosFisicos(),
            id: this.form.get(['id']).value,
            recurso: this.form.get(['recurso']).value,
            tipo: this.form.get(['tipo']).value,
            unidadMedida: this.form.get(['unidadMedida']).value,
            valorUnitario: this.form.get(['valorUnitario']).value,
            valor1H: this.form.get(['valor1H']).value,
            valor2H: this.form.get(['valor2H']).value,
            valor3H: this.form.get(['valor3H']).value,
            valor4H: this.form.get(['valor4H']).value,
            valor5H: this.form.get(['valor5H']).value,
            valor6H: this.form.get(['valor6H']).value,
            valor7H: this.form.get(['valor7H']).value,
            valor8H: this.form.get(['valor8H']).value,
            valor9H: this.form.get(['valor9H']).value,
            valor10H: this.form.get(['valor10H']).value,
            valor11H: this.form.get(['valor11H']).value,
            valor12H: this.form.get(['valor12H']).value,
            impuesto: this.form.get(['impuesto']).value,
            foto: this.form.get(['foto']).value,
            fotoContentType: this.form.get(['fotoContentType']).value,
            video: this.form.get(['video']).value,
            videoContentType: this.form.get(['videoContentType']).value,
            sede: this.form.get(['sede']).value,
            tipoRecurso: this.form.get(['tipoRecurso']).value,
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
                this.recursosFisicos[fieldName] = data;
                this.recursosFisicos[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.recursosFisicos, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareSedes(first: Sedes, second: Sedes): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackSedesById(index: number, item: Sedes) {
        return item.id;
    }
    compareTipoRecurso(first: TipoRecurso, second: TipoRecurso): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackTipoRecursoById(index: number, item: TipoRecurso) {
        return item.id;
    }
}
