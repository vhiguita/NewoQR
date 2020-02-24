import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Beneficio } from './beneficio.model';
import { BeneficioService } from './beneficio.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-beneficio-update',
    templateUrl: 'beneficio-update.html'
})
export class BeneficioUpdatePage implements OnInit {

    beneficio: Beneficio;
    users: User[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        tipoBeneficio: [null, [Validators.required]],
        descuento: [null, [Validators.required]],
        user: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private beneficioService: BeneficioService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.beneficio = response.data;
            this.isNew = this.beneficio.id === null || this.beneficio.id === undefined;
        });
    }

    updateForm(beneficio: Beneficio) {
        this.form.patchValue({
            id: beneficio.id,
            tipoBeneficio: beneficio.tipoBeneficio,
            descuento: beneficio.descuento,
            user: beneficio.user,
        });
    }

    save() {
        this.isSaving = true;
        const beneficio = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.beneficioService.update(beneficio));
        } else {
            this.subscribeToSaveResponse(this.beneficioService.create(beneficio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Beneficio>>) {
        result.subscribe((res: HttpResponse<Beneficio>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Beneficio ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/beneficio');
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

    private createFromForm(): Beneficio {
        return {
            ...new Beneficio(),
            id: this.form.get(['id']).value,
            tipoBeneficio: this.form.get(['tipoBeneficio']).value,
            descuento: this.form.get(['descuento']).value,
            user: this.form.get(['user']).value,
        };
    }

    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
