import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
    selector: 'page-empresa-update',
    templateUrl: 'empresa-update.html'
})
export class EmpresaUpdatePage implements OnInit {

    empresa: Empresa;
    users: User[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        razonSocial: [null, [Validators.required]],
        nit: [null, [Validators.required]],
        direccion: [null, []],
        telefono: [null, []],
        correo: [null, []],
        web: [null, []],
        celular: [null, []],
        biografia: [null, [Validators.required]],
        imagen1: [null, []],
        imagen1ContentType: [null, []],
        imagen2: [null, []],
        imagen2ContentType: [null, []],
        imagen3: [null, []],
        imagen3ContentType: [null, []],
        facebook: [null, []],
        instagram: [null, []],
        idGoogle: [null, []],
        twiter: [null, []],
        conocimientosQueDomina: [null, [Validators.required]],
        temasDeInteres: [null, [Validators.required]],
        miembro: [null, []],
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
        private empresaService: EmpresaService
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
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.empresa = response.data;
            this.isNew = this.empresa.id === null || this.empresa.id === undefined;
        });
    }

    updateForm(empresa: Empresa) {
        this.form.patchValue({
            id: empresa.id,
            razonSocial: empresa.razonSocial,
            nit: empresa.nit,
            direccion: empresa.direccion,
            telefono: empresa.telefono,
            correo: empresa.correo,
            web: empresa.web,
            celular: empresa.celular,
            biografia: empresa.biografia,
            imagen1: empresa.imagen1,
            imagen1ContentType: empresa.imagen1ContentType,
            imagen2: empresa.imagen2,
            imagen2ContentType: empresa.imagen2ContentType,
            imagen3: empresa.imagen3,
            imagen3ContentType: empresa.imagen3ContentType,
            facebook: empresa.facebook,
            instagram: empresa.instagram,
            idGoogle: empresa.idGoogle,
            twiter: empresa.twiter,
            conocimientosQueDomina: empresa.conocimientosQueDomina,
            temasDeInteres: empresa.temasDeInteres,
            miembro: empresa.miembro,
        });
    }

    save() {
        this.isSaving = true;
        const empresa = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.empresaService.update(empresa));
        } else {
            this.subscribeToSaveResponse(this.empresaService.create(empresa));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Empresa>>) {
        result.subscribe((res: HttpResponse<Empresa>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Empresa ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/empresa');
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

    private createFromForm(): Empresa {
        return {
            ...new Empresa(),
            id: this.form.get(['id']).value,
            razonSocial: this.form.get(['razonSocial']).value,
            nit: this.form.get(['nit']).value,
            direccion: this.form.get(['direccion']).value,
            telefono: this.form.get(['telefono']).value,
            correo: this.form.get(['correo']).value,
            web: this.form.get(['web']).value,
            celular: this.form.get(['celular']).value,
            biografia: this.form.get(['biografia']).value,
            imagen1: this.form.get(['imagen1']).value,
            imagen1ContentType: this.form.get(['imagen1ContentType']).value,
            imagen2: this.form.get(['imagen2']).value,
            imagen2ContentType: this.form.get(['imagen2ContentType']).value,
            imagen3: this.form.get(['imagen3']).value,
            imagen3ContentType: this.form.get(['imagen3ContentType']).value,
            facebook: this.form.get(['facebook']).value,
            instagram: this.form.get(['instagram']).value,
            idGoogle: this.form.get(['idGoogle']).value,
            twiter: this.form.get(['twiter']).value,
            conocimientosQueDomina: this.form.get(['conocimientosQueDomina']).value,
            temasDeInteres: this.form.get(['temasDeInteres']).value,
            miembro: this.form.get(['miembro']).value,
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
                this.empresa[fieldName] = data;
                this.empresa[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.empresa, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareUser(first: User, second: User): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}
