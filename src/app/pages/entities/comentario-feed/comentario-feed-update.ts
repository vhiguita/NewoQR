import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ComentarioFeed } from './comentario-feed.model';
import { ComentarioFeedService } from './comentario-feed.service';
import { Feed, FeedService } from '../feed';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-comentario-feed-update',
    templateUrl: 'comentario-feed-update.html'
})
export class ComentarioFeedUpdatePage implements OnInit {

    comentarioFeed: ComentarioFeed;
    feeds: Feed[];
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
        feed: [null, []],
        idUser: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,
        private feedService: FeedService,
        private userService: UserService,
        private comentarioFeedService: ComentarioFeedService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.feedService.query()
            .subscribe(data => { this.feeds = data.body; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.comentarioFeed = response.data;
            this.isNew = this.comentarioFeed.id === null || this.comentarioFeed.id === undefined;
        });
    }

    updateForm(comentarioFeed: ComentarioFeed) {
        this.form.patchValue({
            id: comentarioFeed.id,
            comentario: comentarioFeed.comentario,
            fecha: (this.isNew) ? new Date().toISOString() : comentarioFeed.fecha,
            meGusta: comentarioFeed.meGusta,
            seguir: comentarioFeed.seguir,
            feed: comentarioFeed.feed,
            idUser: comentarioFeed.idUser,
        });
    }

    save() {
        this.isSaving = true;
        const comentarioFeed = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.comentarioFeedService.update(comentarioFeed));
        } else {
            this.subscribeToSaveResponse(this.comentarioFeedService.create(comentarioFeed));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ComentarioFeed>>) {
        result.subscribe((res: HttpResponse<ComentarioFeed>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ComentarioFeed ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/comentario-feed');
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

    private createFromForm(): ComentarioFeed {
        return {
            ...new ComentarioFeed(),
            id: this.form.get(['id']).value,
            comentario: this.form.get(['comentario']).value,
            fecha: new Date(this.form.get(['fecha']).value),
            meGusta: this.form.get(['meGusta']).value,
            seguir: this.form.get(['seguir']).value,
            feed: this.form.get(['feed']).value,
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

    compareFeed(first: Feed, second: Feed): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackFeedById(index: number, item: Feed) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
