import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MargenNewoBlog } from './margen-newo-blog.model';
import { MargenNewoBlogService } from './margen-newo-blog.service';
import { Blog, BlogService } from '../blog';

@Component({
    selector: 'page-margen-newo-blog-update',
    templateUrl: 'margen-newo-blog-update.html'
})
export class MargenNewoBlogUpdatePage implements OnInit {

    margenNewoBlog: MargenNewoBlog;
    blogs: Blog[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        porcentajeMargen: [null, []],
        blog: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private blogService: BlogService,
        private margenNewoBlogService: MargenNewoBlogService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.blogService.query()
            .subscribe(data => { this.blogs = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.margenNewoBlog = response.data;
            this.isNew = this.margenNewoBlog.id === null || this.margenNewoBlog.id === undefined;
        });
    }

    updateForm(margenNewoBlog: MargenNewoBlog) {
        this.form.patchValue({
            id: margenNewoBlog.id,
            porcentajeMargen: margenNewoBlog.porcentajeMargen,
            blog: margenNewoBlog.blog,
        });
    }

    save() {
        this.isSaving = true;
        const margenNewoBlog = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.margenNewoBlogService.update(margenNewoBlog));
        } else {
            this.subscribeToSaveResponse(this.margenNewoBlogService.create(margenNewoBlog));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MargenNewoBlog>>) {
        result.subscribe((res: HttpResponse<MargenNewoBlog>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MargenNewoBlog ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/margen-newo-blog');
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

    private createFromForm(): MargenNewoBlog {
        return {
            ...new MargenNewoBlog(),
            id: this.form.get(['id']).value,
            porcentajeMargen: this.form.get(['porcentajeMargen']).value,
            blog: this.form.get(['blog']).value,
        };
    }

    compareBlog(first: Blog, second: Blog): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackBlogById(index: number, item: Blog) {
        return item.id;
    }
}
