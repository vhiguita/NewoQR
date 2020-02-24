import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Feed } from './feed.model';
import { FeedService } from './feed.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { CategoriaContenidos, CategoriaContenidosService } from '../categoria-contenidos';

@Component({
    selector: 'page-feed-update',
    templateUrl: 'feed-update.html'
})
export class FeedUpdatePage implements OnInit {

    feed: Feed;
    users: User[];
    categoriaContenidos: CategoriaContenidos[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    fecha: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        titulo: [null, [Validators.required]],
        descripcion: [null, [Validators.required]],
        imagen1: [null, [Validators.required]],
        imagen1ContentType: [null, []],
        imagen2: [null, []],
        imagen2ContentType: [null, []],
        tipoContenido: [null, []],
        contenido: [null, [Validators.required]],
        fecha: [null, []],
        impuesto: [null, []],
        vistas: [null, []],
        meGusta: [null, []],
        seguidores: [null, []],
        idUser: [null, []],
        categoriaFeed: [null, []],
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
        private categoriaContenidosService: CategoriaContenidosService,
        private feedService: FeedService
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
        this.categoriaContenidosService.query()
            .subscribe(data => { this.categoriaContenidos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.feed = response.data;
            this.isNew = this.feed.id === null || this.feed.id === undefined;
        });
    }

    updateForm(feed: Feed) {
        this.form.patchValue({
            id: feed.id,
            titulo: feed.titulo,
            descripcion: feed.descripcion,
            imagen1: feed.imagen1,
            imagen1ContentType: feed.imagen1ContentType,
            imagen2: feed.imagen2,
            imagen2ContentType: feed.imagen2ContentType,
            tipoContenido: feed.tipoContenido,
            contenido: feed.contenido,
            fecha: (this.isNew) ? new Date().toISOString() : feed.fecha,
            impuesto: feed.impuesto,
            vistas: feed.vistas,
            meGusta: feed.meGusta,
            seguidores: feed.seguidores,
            idUser: feed.idUser,
            categoriaFeed: feed.categoriaFeed,
        });
    }

    save() {
        this.isSaving = true;
        const feed = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.feedService.update(feed));
        } else {
            this.subscribeToSaveResponse(this.feedService.create(feed));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Feed>>) {
        result.subscribe((res: HttpResponse<Feed>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Feed ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/feed');
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

    private createFromForm(): Feed {
        return {
            ...new Feed(),
            id: this.form.get(['id']).value,
            titulo: this.form.get(['titulo']).value,
            descripcion: this.form.get(['descripcion']).value,
            imagen1: this.form.get(['imagen1']).value,
            imagen1ContentType: this.form.get(['imagen1ContentType']).value,
            imagen2: this.form.get(['imagen2']).value,
            imagen2ContentType: this.form.get(['imagen2ContentType']).value,
            tipoContenido: this.form.get(['tipoContenido']).value,
            contenido: this.form.get(['contenido']).value,
            fecha: new Date(this.form.get(['fecha']).value),
            impuesto: this.form.get(['impuesto']).value,
            vistas: this.form.get(['vistas']).value,
            meGusta: this.form.get(['meGusta']).value,
            seguidores: this.form.get(['seguidores']).value,
            idUser: this.form.get(['idUser']).value,
            categoriaFeed: this.form.get(['categoriaFeed']).value,
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
                this.feed[fieldName] = data;
                this.feed[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.feed, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    compareCategoriaContenidos(first: CategoriaContenidos, second: CategoriaContenidos): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackCategoriaContenidosById(index: number, item: CategoriaContenidos) {
        return item.id;
    }
}
