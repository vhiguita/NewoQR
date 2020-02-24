import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { CategoriaContenidos, CategoriaContenidosService } from '../categoria-contenidos';
import { Grupos, GruposService } from '../grupos';

@Component({
    selector: 'page-blog-update',
    templateUrl: 'blog-update.html'
})
export class BlogUpdatePage implements OnInit {

    blog: Blog;
    users: User[];
    categoriaContenidos: CategoriaContenidos[];
    grupos: Grupos[];
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
        tipoContenido: [null, []],
        contenido: [null, [Validators.required]],
        fecha: [null, []],
        audio: [null, []],
        audioContentType: [null, []],
        video: [null, []],
        imagen1: [null, [Validators.required]],
        imagen1ContentType: [null, []],
        imagen2: [null, []],
        imagen2ContentType: [null, []],
        banner: [null, []],
        bannerContentType: [null, []],
        estadoPublicacion: [null, []],
        tipoConsumo: [null, []],
        valor: [null, []],
        impuesto: [null, []],
        vistas: [null, []],
        meGusta: [null, []],
        seguidores: [null, []],
        idUser: [null, []],
        categoriaBlog: [null, []],
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
        private userService: UserService,
        private categoriaContenidosService: CategoriaContenidosService,
        private gruposService: GruposService,
        private blogService: BlogService
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
        this.gruposService.query()
            .subscribe(data => { this.grupos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.blog = response.data;
            this.isNew = this.blog.id === null || this.blog.id === undefined;
        });
    }

    updateForm(blog: Blog) {
        this.form.patchValue({
            id: blog.id,
            titulo: blog.titulo,
            descripcion: blog.descripcion,
            tipoContenido: blog.tipoContenido,
            contenido: blog.contenido,
            fecha: (this.isNew) ? new Date().toISOString() : blog.fecha,
            audio: blog.audio,
            audioContentType: blog.audioContentType,
            video: blog.video,
            imagen1: blog.imagen1,
            imagen1ContentType: blog.imagen1ContentType,
            imagen2: blog.imagen2,
            imagen2ContentType: blog.imagen2ContentType,
            banner: blog.banner,
            bannerContentType: blog.bannerContentType,
            estadoPublicacion: blog.estadoPublicacion,
            tipoConsumo: blog.tipoConsumo,
            valor: blog.valor,
            impuesto: blog.impuesto,
            vistas: blog.vistas,
            meGusta: blog.meGusta,
            seguidores: blog.seguidores,
            idUser: blog.idUser,
            categoriaBlog: blog.categoriaBlog,
            grupos: blog.grupos,
        });
    }

    save() {
        this.isSaving = true;
        const blog = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.blogService.update(blog));
        } else {
            this.subscribeToSaveResponse(this.blogService.create(blog));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Blog>>) {
        result.subscribe((res: HttpResponse<Blog>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Blog ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/blog');
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

    private createFromForm(): Blog {
        return {
            ...new Blog(),
            id: this.form.get(['id']).value,
            titulo: this.form.get(['titulo']).value,
            descripcion: this.form.get(['descripcion']).value,
            tipoContenido: this.form.get(['tipoContenido']).value,
            contenido: this.form.get(['contenido']).value,
            fecha: new Date(this.form.get(['fecha']).value),
            audio: this.form.get(['audio']).value,
            audioContentType: this.form.get(['audioContentType']).value,
            video: this.form.get(['video']).value,
            imagen1: this.form.get(['imagen1']).value,
            imagen1ContentType: this.form.get(['imagen1ContentType']).value,
            imagen2: this.form.get(['imagen2']).value,
            imagen2ContentType: this.form.get(['imagen2ContentType']).value,
            banner: this.form.get(['banner']).value,
            bannerContentType: this.form.get(['bannerContentType']).value,
            estadoPublicacion: this.form.get(['estadoPublicacion']).value,
            tipoConsumo: this.form.get(['tipoConsumo']).value,
            valor: this.form.get(['valor']).value,
            impuesto: this.form.get(['impuesto']).value,
            vistas: this.form.get(['vistas']).value,
            meGusta: this.form.get(['meGusta']).value,
            seguidores: this.form.get(['seguidores']).value,
            idUser: this.form.get(['idUser']).value,
            categoriaBlog: this.form.get(['categoriaBlog']).value,
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
                this.blog[fieldName] = data;
                this.blog[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.blog, this.elementRef, field, fieldContentType, idInput);
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
    compareGrupos(first: Grupos, second: Grupos): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackGruposById(index: number, item: Grupos) {
        return item.id;
    }
}
