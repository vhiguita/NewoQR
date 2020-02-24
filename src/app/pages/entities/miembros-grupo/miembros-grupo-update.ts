import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MiembrosGrupo } from './miembros-grupo.model';
import { MiembrosGrupoService } from './miembros-grupo.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { Grupos, GruposService } from '../grupos';

@Component({
    selector: 'page-miembros-grupo-update',
    templateUrl: 'miembros-grupo-update.html'
})
export class MiembrosGrupoUpdatePage implements OnInit {

    miembrosGrupo: MiembrosGrupo;
    users: User[];
    grupos: Grupos[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        miembro: [null, []],
        grupo: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private gruposService: GruposService,
        private miembrosGrupoService: MiembrosGrupoService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.gruposService.query()
            .subscribe(data => { this.grupos = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.miembrosGrupo = response.data;
            this.isNew = this.miembrosGrupo.id === null || this.miembrosGrupo.id === undefined;
        });
    }

    updateForm(miembrosGrupo: MiembrosGrupo) {
        this.form.patchValue({
            id: miembrosGrupo.id,
            miembro: miembrosGrupo.miembro,
            grupo: miembrosGrupo.grupo,
        });
    }

    save() {
        this.isSaving = true;
        const miembrosGrupo = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.miembrosGrupoService.update(miembrosGrupo));
        } else {
            this.subscribeToSaveResponse(this.miembrosGrupoService.create(miembrosGrupo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<MiembrosGrupo>>) {
        result.subscribe((res: HttpResponse<MiembrosGrupo>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `MiembrosGrupo ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/miembros-grupo');
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

    private createFromForm(): MiembrosGrupo {
        return {
            ...new MiembrosGrupo(),
            id: this.form.get(['id']).value,
            miembro: this.form.get(['miembro']).value,
            grupo: this.form.get(['grupo']).value,
        };
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
