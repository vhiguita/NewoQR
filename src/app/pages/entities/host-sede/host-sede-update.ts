import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HostSede } from './host-sede.model';
import { HostSedeService } from './host-sede.service';
import { Sedes, SedesService } from '../sedes';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-host-sede-update',
    templateUrl: 'host-sede-update.html'
})
export class HostSedeUpdatePage implements OnInit {

    hostSede: HostSede;
    sedes: Sedes[];
    users: User[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        sede: [null, []],
        miembro: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private sedesService: SedesService,
        private userService: UserService,
        private hostSedeService: HostSedeService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.sedesService.query()
            .subscribe(data => { this.sedes = data.body; }, (error) => this.onError(error));
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.hostSede = response.data;
            this.isNew = this.hostSede.id === null || this.hostSede.id === undefined;
        });
    }

    updateForm(hostSede: HostSede) {
        this.form.patchValue({
            id: hostSede.id,
            sede: hostSede.sede,
            miembro: hostSede.miembro,
        });
    }

    save() {
        this.isSaving = true;
        const hostSede = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.hostSedeService.update(hostSede));
        } else {
            this.subscribeToSaveResponse(this.hostSedeService.create(hostSede));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<HostSede>>) {
        result.subscribe((res: HttpResponse<HostSede>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `HostSede ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/host-sede');
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

    private createFromForm(): HostSede {
        return {
            ...new HostSede(),
            id: this.form.get(['id']).value,
            sede: this.form.get(['sede']).value,
            miembro: this.form.get(['miembro']).value,
        };
    }

    compareSedes(first: Sedes, second: Sedes): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackSedesById(index: number, item: Sedes) {
        return item.id;
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
