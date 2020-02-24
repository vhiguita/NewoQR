import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from './evento.model';
import { EventoService } from './evento.service';
import { CategoriaContenidos, CategoriaContenidosService } from '../categoria-contenidos';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { Grupos, GruposService } from '../grupos';

@Component({
    selector: 'page-evento-update',
    templateUrl: 'evento-update.html'
})
export class EventoUpdatePage implements OnInit {

    evento: Evento;
    categoriaContenidos: CategoriaContenidos[];
    users: User[];
    grupos: Grupos[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombreEvento: [null, [Validators.required]],
        descripcion: [null, [Validators.required]],
        contenido: [null, [Validators.required]],
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
        tipoConsumo: [null, []],
        valor: [null, []],
        impuesto: [null, []],
        tipoEvento: [null, []],
        eventoNEWO: ['false', []],
        web: [null, []],
        vistas: [null, []],
        meGusta: [null, []],
        seguidores: [null, []],
        categoriaEvento: [null, []],
        idUser: [null, []],
        grupos: [null, []],
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
        private userService: UserService,
        private gruposService: GruposService,
        private eventoService: EventoService
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
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.gruposService.query()
            .subscribe(data => { this.grupos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.evento = response.data;
            this.isNew = this.evento.id === null || this.evento.id === undefined;
        });
    }

    updateForm(evento: Evento) {
        this.form.patchValue({
            id: evento.id,
            nombreEvento: evento.nombreEvento,
            descripcion: evento.descripcion,
            contenido: evento.contenido,
            audio: evento.audio,
            audioContentType: evento.audioContentType,
            video: evento.video,
            videoContentType: evento.videoContentType,
            imagen1: evento.imagen1,
            imagen1ContentType: evento.imagen1ContentType,
            imagen2: evento.imagen2,
            imagen2ContentType: evento.imagen2ContentType,
            banner: evento.banner,
            bannerContentType: evento.bannerContentType,
            tipoConsumo: evento.tipoConsumo,
            valor: evento.valor,
            impuesto: evento.impuesto,
            tipoEvento: evento.tipoEvento,
            eventoNEWO: evento.eventoNEWO,
            web: evento.web,
            vistas: evento.vistas,
            meGusta: evento.meGusta,
            seguidores: evento.seguidores,
            categoriaEvento: evento.categoriaEvento,
            idUser: evento.idUser,
            grupos: evento.grupos,
        });
    }

    save() {
        this.isSaving = true;
        const evento = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.eventoService.update(evento));
        } else {
            this.subscribeToSaveResponse(this.eventoService.create(evento));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Evento>>) {
        result.subscribe((res: HttpResponse<Evento>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Evento ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/evento');
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

    private createFromForm(): Evento {
        return {
            ...new Evento(),
            id: this.form.get(['id']).value,
            nombreEvento: this.form.get(['nombreEvento']).value,
            descripcion: this.form.get(['descripcion']).value,
            contenido: this.form.get(['contenido']).value,
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
            tipoConsumo: this.form.get(['tipoConsumo']).value,
            valor: this.form.get(['valor']).value,
            impuesto: this.form.get(['impuesto']).value,
            tipoEvento: this.form.get(['tipoEvento']).value,
            eventoNEWO: this.form.get(['eventoNEWO']).value,
            web: this.form.get(['web']).value,
            vistas: this.form.get(['vistas']).value,
            meGusta: this.form.get(['meGusta']).value,
            seguidores: this.form.get(['seguidores']).value,
            categoriaEvento: this.form.get(['categoriaEvento']).value,
            idUser: this.form.get(['idUser']).value,
            grupos: this.form.get(['grupos']).value,
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
                this.evento[fieldName] = data;
                this.evento[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.evento, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareCategoriaContenidos(first: CategoriaContenidos, second: CategoriaContenidos): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCategoriaContenidosById(index: number, item: CategoriaContenidos) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    compareGrupos(first: Grupos, second: Grupos): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackGruposById(index: number, item: Grupos) {
        return item.id;
    }
}
