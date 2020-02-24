import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Grupos } from './grupos.model';
import { GruposService } from './grupos.service';
import { CategoriaContenidos, CategoriaContenidosService } from '../categoria-contenidos';

@Component({
    selector: 'page-grupos-update',
    templateUrl: 'grupos-update.html'
})
export class GruposUpdatePage implements OnInit {

    grupos: Grupos;
    categoriaContenidos: CategoriaContenidos[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombreGrupo: [null, [Validators.required]],
        instagram: [null, []],
        facebook: [null, []],
        twiter: [null, []],
        linkedIn: [null, []],
        tipoGrupo: [null, []],
        tipoConsumo: [null, []],
        valorSuscripcion: [null, []],
        impuesto: [null, []],
        reglasGrupo: [null, []],
        audio: [null, []],
        audioContentType: [null, []],
        video: [null, []],
        videoContentType: [null, []],
        imagen1: [null, [Validators.required]],
        imagen1ContentType: [null, []],
        imagen2: [null, []],
        imagen2ContentType: [null, []],
        banner: [null, []],
        bannerContentType: [null, []],
        categoriaGrupo: [null, []],
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
        private categoriaContenidosService: CategoriaContenidosService,
        private gruposService: GruposService
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
        this.categoriaContenidosService.query()
            .subscribe(data => { this.categoriaContenidos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.grupos = response.data;
            this.isNew = this.grupos.id === null || this.grupos.id === undefined;
        });
    }

    updateForm(grupos: Grupos) {
        this.form.patchValue({
            id: grupos.id,
            nombreGrupo: grupos.nombreGrupo,
            instagram: grupos.instagram,
            facebook: grupos.facebook,
            twiter: grupos.twiter,
            linkedIn: grupos.linkedIn,
            tipoGrupo: grupos.tipoGrupo,
            tipoConsumo: grupos.tipoConsumo,
            valorSuscripcion: grupos.valorSuscripcion,
            impuesto: grupos.impuesto,
            reglasGrupo: grupos.reglasGrupo,
            audio: grupos.audio,
            audioContentType: grupos.audioContentType,
            video: grupos.video,
            videoContentType: grupos.videoContentType,
            imagen1: grupos.imagen1,
            imagen1ContentType: grupos.imagen1ContentType,
            imagen2: grupos.imagen2,
            imagen2ContentType: grupos.imagen2ContentType,
            banner: grupos.banner,
            bannerContentType: grupos.bannerContentType,
            categoriaGrupo: grupos.categoriaGrupo,
        });
    }

    save() {
        this.isSaving = true;
        const grupos = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.gruposService.update(grupos));
        } else {
            this.subscribeToSaveResponse(this.gruposService.create(grupos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Grupos>>) {
        result.subscribe((res: HttpResponse<Grupos>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Grupos ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/grupos');
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

    private createFromForm(): Grupos {
        return {
            ...new Grupos(),
            id: this.form.get(['id']).value,
            nombreGrupo: this.form.get(['nombreGrupo']).value,
            instagram: this.form.get(['instagram']).value,
            facebook: this.form.get(['facebook']).value,
            twiter: this.form.get(['twiter']).value,
            linkedIn: this.form.get(['linkedIn']).value,
            tipoGrupo: this.form.get(['tipoGrupo']).value,
            tipoConsumo: this.form.get(['tipoConsumo']).value,
            valorSuscripcion: this.form.get(['valorSuscripcion']).value,
            impuesto: this.form.get(['impuesto']).value,
            reglasGrupo: this.form.get(['reglasGrupo']).value,
            audio: this.form.get(['audio']).value,
            audioContentType: this.form.get(['audioContentType']).value,
            video: this.form.get(['video']).value,
            videoContentType: this.form.get(['videoContentType']).value,
            imagen1: this.form.get(['imagen1']).value,
            imagen1ContentType: this.form.get(['imagen1ContentType']).value,
            imagen2: this.form.get(['imagen2']).value,
            imagen2ContentType: this.form.get(['imagen2ContentType']).value,
            banner: this.form.get(['banner']).value,
            bannerContentType: this.form.get(['bannerContentType']).value,
            categoriaGrupo: this.form.get(['categoriaGrupo']).value,
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
                this.grupos[fieldName] = data;
                this.grupos[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.grupos, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareCategoriaContenidos(first: CategoriaContenidos, second: CategoriaContenidos): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCategoriaContenidosById(index: number, item: CategoriaContenidos) {
        return item.id;
    }
}
