import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ComentarioVideoBlog } from './comentario-video-blog.model';
import { ComentarioVideoBlogService } from './comentario-video-blog.service';
import { VideoBlog, VideoBlogService } from '../video-blog';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-comentario-video-blog-update',
    templateUrl: 'comentario-video-blog-update.html'
})
export class ComentarioVideoBlogUpdatePage implements OnInit {

    comentarioVideoBlog: ComentarioVideoBlog;
    videoBlogs: VideoBlog[];
    users: User[];
    fecha: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        comentario: [null, [Validators.required]],
        fecha: [null, []],
        meGusta: ['false', []],
        seguir: ['false', []],
        videoBlog: [null, []],
        idUser: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private videoBlogService: VideoBlogService,
        private userService: UserService,
        private comentarioVideoBlogService: ComentarioVideoBlogService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.videoBlogService.query()
            .subscribe(data => { this.videoBlogs = data.body; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.comentarioVideoBlog = response.data;
            this.isNew = this.comentarioVideoBlog.id === null || this.comentarioVideoBlog.id === undefined;
        });
    }

    updateForm(comentarioVideoBlog: ComentarioVideoBlog) {
        this.form.patchValue({
            id: comentarioVideoBlog.id,
            comentario: comentarioVideoBlog.comentario,
            fecha: (this.isNew) ? new Date().toISOString() : comentarioVideoBlog.fecha,
            meGusta: comentarioVideoBlog.meGusta,
            seguir: comentarioVideoBlog.seguir,
            videoBlog: comentarioVideoBlog.videoBlog,
            idUser: comentarioVideoBlog.idUser,
        });
    }

    save() {
        this.isSaving = true;
        const comentarioVideoBlog = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.comentarioVideoBlogService.update(comentarioVideoBlog));
        } else {
            this.subscribeToSaveResponse(this.comentarioVideoBlogService.create(comentarioVideoBlog));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ComentarioVideoBlog>>) {
        result.subscribe((res: HttpResponse<ComentarioVideoBlog>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ComentarioVideoBlog ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/comentario-video-blog');
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

    private createFromForm(): ComentarioVideoBlog {
        return {
            ...new ComentarioVideoBlog(),
            id: this.form.get(['id']).value,
            comentario: this.form.get(['comentario']).value,
            fecha: new Date(this.form.get(['fecha']).value),
            meGusta: this.form.get(['meGusta']).value,
            seguir: this.form.get(['seguir']).value,
            videoBlog: this.form.get(['videoBlog']).value,
            idUser: this.form.get(['idUser']).value,
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

    compareVideoBlog(first: VideoBlog, second: VideoBlog): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackVideoBlogById(index: number, item: VideoBlog) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
