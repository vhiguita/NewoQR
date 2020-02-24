import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ComentarioBlog } from './comentario-blog.model';
import { ComentarioBlogService } from './comentario-blog.service';
import { Blog, BlogService } from '../blog';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-comentario-blog-update',
    templateUrl: 'comentario-blog-update.html'
})
export class ComentarioBlogUpdatePage implements OnInit {

    comentarioBlog: ComentarioBlog;
    blogs: Blog[];
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
        blog: [null, []],
        idUser: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private blogService: BlogService,
        private userService: UserService,
        private comentarioBlogService: ComentarioBlogService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.blogService.query()
            .subscribe(data => { this.blogs = data.body; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.comentarioBlog = response.data;
            this.isNew = this.comentarioBlog.id === null || this.comentarioBlog.id === undefined;
        });
    }

    updateForm(comentarioBlog: ComentarioBlog) {
        this.form.patchValue({
            id: comentarioBlog.id,
            comentario: comentarioBlog.comentario,
            fecha: (this.isNew) ? new Date().toISOString() : comentarioBlog.fecha,
            meGusta: comentarioBlog.meGusta,
            seguir: comentarioBlog.seguir,
            blog: comentarioBlog.blog,
            idUser: comentarioBlog.idUser,
        });
    }

    save() {
        this.isSaving = true;
        const comentarioBlog = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.comentarioBlogService.update(comentarioBlog));
        } else {
            this.subscribeToSaveResponse(this.comentarioBlogService.create(comentarioBlog));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ComentarioBlog>>) {
        result.subscribe((res: HttpResponse<ComentarioBlog>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ComentarioBlog ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/comentario-blog');
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

    private createFromForm(): ComentarioBlog {
        return {
            ...new ComentarioBlog(),
            id: this.form.get(['id']).value,
            comentario: this.form.get(['comentario']).value,
            fecha: new Date(this.form.get(['fecha']).value),
            meGusta: this.form.get(['meGusta']).value,
            seguir: this.form.get(['seguir']).value,
            blog: this.form.get(['blog']).value,
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

    compareBlog(first: Blog, second: Blog): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackBlogById(index: number, item: Blog) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
