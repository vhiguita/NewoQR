import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsoRecursoFisico } from './uso-recurso-fisico.model';
import { UsoRecursoFisicoService } from './uso-recurso-fisico.service';
import { RecursosFisicos, RecursosFisicosService } from '../recursos-fisicos';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-uso-recurso-fisico-update',
    templateUrl: 'uso-recurso-fisico-update.html'
})
export class UsoRecursoFisicoUpdatePage implements OnInit {

    usoRecursoFisico: UsoRecursoFisico;
    recursosFisicos: RecursosFisicos[];
    users: User[];
    registroFechaInicio: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        registroFechaInicio: [null, []],
        tipoRegistro: [null, []],
        recurso: [null, []],
        user: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private recursosFisicosService: RecursosFisicosService,
        private userService: UserService,
        private usoRecursoFisicoService: UsoRecursoFisicoService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.recursosFisicosService.query()
            .subscribe(data => { this.recursosFisicos = data.body; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.usoRecursoFisico = response.data;
            this.isNew = this.usoRecursoFisico.id === null || this.usoRecursoFisico.id === undefined;
        });
    }

    updateForm(usoRecursoFisico: UsoRecursoFisico) {
        this.form.patchValue({
            id: usoRecursoFisico.id,
            registroFechaInicio: (this.isNew) ? new Date().toISOString() : usoRecursoFisico.registroFechaInicio,
            tipoRegistro: usoRecursoFisico.tipoRegistro,
            recurso: usoRecursoFisico.recurso,
            user: usoRecursoFisico.user,
        });
    }

    save() {
        this.isSaving = true;
        const usoRecursoFisico = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.usoRecursoFisicoService.update(usoRecursoFisico));
        } else {
            this.subscribeToSaveResponse(this.usoRecursoFisicoService.create(usoRecursoFisico));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<UsoRecursoFisico>>) {
        result.subscribe((res: HttpResponse<UsoRecursoFisico>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `UsoRecursoFisico ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/uso-recurso-fisico');
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

    private createFromForm(): UsoRecursoFisico {
        return {
            ...new UsoRecursoFisico(),
            id: this.form.get(['id']).value,
            registroFechaInicio: new Date(this.form.get(['registroFechaInicio']).value),
            tipoRegistro: this.form.get(['tipoRegistro']).value,
            recurso: this.form.get(['recurso']).value,
            user: this.form.get(['user']).value,
        };
    }

    compareRecursosFisicos(first: RecursosFisicos, second: RecursosFisicos): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRecursosFisicosById(index: number, item: RecursosFisicos) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
