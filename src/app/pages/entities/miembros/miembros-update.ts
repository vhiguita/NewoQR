import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Miembros } from './miembros.model';
import { MiembrosService } from './miembros.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { Pais, PaisService } from '../pais';

@Component({
    selector: 'page-miembros-update',
    templateUrl: 'miembros-update.html'
})
export class MiembrosUpdatePage implements OnInit {

    miembros: Miembros;
    users: User[];
    pais: Pais[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    fechaNacimientoDp: any;
    fechaRegistro: string;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        idUser: [null, [Validators.required]],
        nombre: [null, [Validators.required]],
        apellido: [null, [Validators.required]],
        login: [null, [Validators.required]],
        tipoDocumento: [null, [Validators.required]],
        identificacion: [null, [Validators.required]],
        fechaNacimiento: [null, [Validators.required]],
        fechaRegistro: [null, []],
        genero: [null, [Validators.required]],
        celular: [null, [Validators.required]],
        biografia: [null, [Validators.required]],
        foto1: [null, [Validators.required]],
        foto1ContentType: [null, []],
        foto2: [null, []],
        foto2ContentType: [null, []],
        foto3: [null, []],
        foto3ContentType: [null, []],
        conocimientosQueDomina: [null, [Validators.required]],
        temasDeInteres: [null, [Validators.required]],
        facebook: [null, []],
        instagram: [null, []],
        idGoogle: [null, []],
        twiter: [null, []],
        derechosDeCompra: ['false', []],
        accesoIlimitado: ['false', []],
        aliado: ['false', []],
        host: ['false', []],
        user: [null, []],
        nacionalidad: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        public platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,

        private elementRef: ElementRef,
        private camera: Camera,
        private userService: UserService,
        private paisService: PaisService,
        private miembrosService: MiembrosService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

        // Set the Camera options
        this.cameraOptions = {
            quality: 100,
            targetWidth: 900,
            targetHeight: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: 1
        };
    }

    ngOnInit() {
        this.userService.findAll().subscribe(data => this.users = data, (error) => this.onError(error));
        this.paisService.query()
            .subscribe(data => { this.pais = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.miembros = response.data;
            this.isNew = this.miembros.id === null || this.miembros.id === undefined;
        });
    }

    updateForm(miembros: Miembros) {
        this.form.patchValue({
            id: miembros.id,
            idUser: miembros.idUser,
            nombre: miembros.nombre,
            apellido: miembros.apellido,
            login: miembros.login,
            tipoDocumento: miembros.tipoDocumento,
            identificacion: miembros.identificacion,
            fechaNacimiento: miembros.fechaNacimiento,
            fechaRegistro: (this.isNew) ? new Date().toISOString() : miembros.fechaRegistro,
            genero: miembros.genero,
            celular: miembros.celular,
            biografia: miembros.biografia,
            foto1: miembros.foto1,
            foto1ContentType: miembros.foto1ContentType,
            foto2: miembros.foto2,
            foto2ContentType: miembros.foto2ContentType,
            foto3: miembros.foto3,
            foto3ContentType: miembros.foto3ContentType,
            conocimientosQueDomina: miembros.conocimientosQueDomina,
            temasDeInteres: miembros.temasDeInteres,
            facebook: miembros.facebook,
            instagram: miembros.instagram,
            idGoogle: miembros.idGoogle,
            twiter: miembros.twiter,
            derechosDeCompra: miembros.derechosDeCompra,
            accesoIlimitado: miembros.accesoIlimitado,
            aliado: miembros.aliado,
            host: miembros.host,
            user: miembros.user,
            nacionalidad: miembros.nacionalidad,
        });
    }

    save() {
        this.isSaving = true;
        const miembros = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.miembrosService.update(miembros));
        } else {
            this.subscribeToSaveResponse(this.miembrosService.create(miembros));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Miembros>>) {
        result.subscribe((res: HttpResponse<Miembros>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Miembros ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/miembros');
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

    private createFromForm(): Miembros {
        return {
            ...new Miembros(),
            id: this.form.get(['id']).value,
            idUser: this.form.get(['idUser']).value,
            nombre: this.form.get(['nombre']).value,
            apellido: this.form.get(['apellido']).value,
            login: this.form.get(['login']).value,
            tipoDocumento: this.form.get(['tipoDocumento']).value,
            identificacion: this.form.get(['identificacion']).value,
            fechaNacimiento: this.form.get(['fechaNacimiento']).value,
            fechaRegistro: new Date(this.form.get(['fechaRegistro']).value),
            genero: this.form.get(['genero']).value,
            celular: this.form.get(['celular']).value,
            biografia: this.form.get(['biografia']).value,
            foto1: this.form.get(['foto1']).value,
            foto1ContentType: this.form.get(['foto1ContentType']).value,
            foto2: this.form.get(['foto2']).value,
            foto2ContentType: this.form.get(['foto2ContentType']).value,
            foto3: this.form.get(['foto3']).value,
            foto3ContentType: this.form.get(['foto3ContentType']).value,
            conocimientosQueDomina: this.form.get(['conocimientosQueDomina']).value,
            temasDeInteres: this.form.get(['temasDeInteres']).value,
            facebook: this.form.get(['facebook']).value,
            instagram: this.form.get(['instagram']).value,
            idGoogle: this.form.get(['idGoogle']).value,
            twiter: this.form.get(['twiter']).value,
            derechosDeCompra: this.form.get(['derechosDeCompra']).value,
            accesoIlimitado: this.form.get(['accesoIlimitado']).value,
            aliado: this.form.get(['aliado']).value,
            host: this.form.get(['host']).value,
            user: this.form.get(['user']).value,
            nacionalidad: this.form.get(['nacionalidad']).value,
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
        this.processWebImage(event, field);
    }

    getPicture(fieldName) {
        if (Camera.installed()) {
            this.camera.getPicture(this.cameraOptions).then((data) => {
                this.miembros[fieldName] = data;
                this.miembros[fieldName + 'ContentType'] = 'image/jpeg';
                this.form.patchValue({ [fieldName]: data });
                this.form.patchValue({ [fieldName + 'ContentType']: 'image/jpeg' });
            }, (err) => {
                alert('Unable to take photo');
            });
        } else {
            //this.fileInput.nativeElement.click();
        }
    }

    processWebImage(event, fieldName) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {

            let imageData = (readerEvent.target as any).result;
            const imageType = event.target.files[0].type;
            imageData = imageData.substring(imageData.indexOf(',') + 1);

            this.form.patchValue({ [fieldName]: imageData });
            this.form.patchValue({ [fieldName + 'ContentType']: imageType });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.miembros, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
    comparePais(first: Pais, second: Pais): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackPaisById(index: number, item: Pais) {
        return item.id;
    }
}
