import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ConsumoMarket } from './consumo-market.model';
import { ConsumoMarketService } from './consumo-market.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-consumo-market-update',
    templateUrl: 'consumo-market-update.html'
})
export class ConsumoMarketUpdatePage implements OnInit {

    consumoMarket: ConsumoMarket;
    users: User[];
    registroFechaInicialDp: any;
    registroFechaFinalDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        totalConsumido: [null, []],
        registroFechaInicial: [null, []],
        registroFechaFinal: [null, []],
        impuesto: [null, []],
        user: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private userService: UserService,
        private consumoMarketService: ConsumoMarketService
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
            this.consumoMarket = response.data;
            this.isNew = this.consumoMarket.id === null || this.consumoMarket.id === undefined;
        });
    }

    updateForm(consumoMarket: ConsumoMarket) {
        this.form.patchValue({
            id: consumoMarket.id,
            totalConsumido: consumoMarket.totalConsumido,
            registroFechaInicial: consumoMarket.registroFechaInicial,
            registroFechaFinal: consumoMarket.registroFechaFinal,
            impuesto: consumoMarket.impuesto,
            user: consumoMarket.user,
        });
    }

    save() {
        this.isSaving = true;
        const consumoMarket = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.consumoMarketService.update(consumoMarket));
        } else {
            this.subscribeToSaveResponse(this.consumoMarketService.create(consumoMarket));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ConsumoMarket>>) {
        result.subscribe((res: HttpResponse<ConsumoMarket>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `ConsumoMarket ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/consumo-market');
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

    private createFromForm(): ConsumoMarket {
        return {
            ...new ConsumoMarket(),
            id: this.form.get(['id']).value,
            totalConsumido: this.form.get(['totalConsumido']).value,
            registroFechaInicial: this.form.get(['registroFechaInicial']).value,
            registroFechaFinal: this.form.get(['registroFechaFinal']).value,
            impuesto: this.form.get(['impuesto']).value,
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
