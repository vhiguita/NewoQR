import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { VideoBlog } from './video-blog.model';
import { VideoBlogService } from './video-blog.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { CategoriaContenidos, CategoriaContenidosService } from '../categoria-contenidos';

@Component({
    selector: 'page-video-blog-update',
    templateUrl: 'video-blog-update.html'
})
export class VideoBlogUpdatePage implements OnInit {

    videoBlog: VideoBlog;
    users: User[];
    categoriaContenidos: CategoriaContenidos[];
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
        video: [null, []],
        estadoPublicacion: [null, []],
        tipoConsumo: [null, []],
        valor: [null, []],
        impuesto: [null, []],
        vistas: [null, []],
        meGusta: [null, []],
        seguidores: [null, []],
        idUser: [null, []],
        categoriaBlog: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private userService: UserService,
        private categoriaContenidosService: CategoriaContenidosService,
        private videoBlogService: VideoBlogService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.categoriaContenidosService.query()
            .subscribe(data => { this.categoriaContenidos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.videoBlog = response.data;
            this.isNew = this.videoBlog.id === null || this.videoBlog.id === undefined;
        });
    }

    updateForm(videoBlog: VideoBlog) {
        this.form.patchValue({
            id: videoBlog.id,
            titulo: videoBlog.titulo,
            descripcion: videoBlog.descripcion,
            tipoContenido: videoBlog.tipoContenido,
            contenido: videoBlog.contenido,
            fecha: (this.isNew) ? new Date().toISOString() : videoBlog.fecha,
            video: videoBlog.video,
            estadoPublicacion: videoBlog.estadoPublicacion,
            tipoConsumo: videoBlog.tipoConsumo,
            valor: videoBlog.valor,
            impuesto: videoBlog.impuesto,
            vistas: videoBlog.vistas,
            meGusta: videoBlog.meGusta,
            seguidores: videoBlog.seguidores,
            idUser: videoBlog.idUser,
            categoriaBlog: videoBlog.categoriaBlog,
        });
    }

    save() {
        this.isSaving = true;
        const videoBlog = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.videoBlogService.update(videoBlog));
        } else {
            this.subscribeToSaveResponse(this.videoBlogService.create(videoBlog));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<VideoBlog>>) {
        result.subscribe((res: HttpResponse<VideoBlog>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `VideoBlog ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/video-blog');
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

    private createFromForm(): VideoBlog {
        return {
            ...new VideoBlog(),
            id: this.form.get(['id']).value,
            titulo: this.form.get(['titulo']).value,
            descripcion: this.form.get(['descripcion']).value,
            tipoContenido: this.form.get(['tipoContenido']).value,
            contenido: this.form.get(['contenido']).value,
            fecha: new Date(this.form.get(['fecha']).value),
            video: this.form.get(['video']).value,
            estadoPublicacion: this.form.get(['estadoPublicacion']).value,
            tipoConsumo: this.form.get(['tipoConsumo']).value,
            valor: this.form.get(['valor']).value,
            impuesto: this.form.get(['impuesto']).value,
            vistas: this.form.get(['vistas']).value,
            meGusta: this.form.get(['meGusta']).value,
            seguidores: this.form.get(['seguidores']).value,
            idUser: this.form.get(['idUser']).value,
            categoriaBlog: this.form.get(['categoriaBlog']).value,
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
