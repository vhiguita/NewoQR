import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipoEmpresas } from './equipo-empresas.model';
import { EquipoEmpresasService } from './equipo-empresas.service';
import { Empresa, EmpresaService } from '../empresa';

@Component({
    selector: 'page-equipo-empresas-update',
    templateUrl: 'equipo-empresas-update.html'
})
export class EquipoEmpresasUpdatePage implements OnInit {

    equipoEmpresas: EquipoEmpresas;
    empresas: Empresa[];
    //@ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        nombre: [null, [Validators.required]],
        telefono: [null, []],
        correo: [null, []],
        direccion: [null, []],
        descripcion: [null, []],
        logo: [null, []],
        logoContentType: [null, []],
        paginaWeb: [null, []],
        conocimientosQueDomina: [null, [Validators.required]],
        temasDeInteres: [null, [Validators.required]],
        empresa: [null, []],
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
        private empresaService: EmpresaService,
        private equipoEmpresasService: EquipoEmpresasService
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
        this.empresaService.query()
            .subscribe(data => { this.empresas = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.equipoEmpresas = response.data;
            this.isNew = this.equipoEmpresas.id === null || this.equipoEmpresas.id === undefined;
        });
    }

    updateForm(equipoEmpresas: EquipoEmpresas) {
        this.form.patchValue({
            id: equipoEmpresas.id,
            nombre: equipoEmpresas.nombre,
            telefono: equipoEmpresas.telefono,
            correo: equipoEmpresas.correo,
            direccion: equipoEmpresas.direccion,
            descripcion: equipoEmpresas.descripcion,
            logo: equipoEmpresas.logo,
            logoContentType: equipoEmpresas.logoContentType,
            paginaWeb: equipoEmpresas.paginaWeb,
            conocimientosQueDomina: equipoEmpresas.conocimientosQueDomina,
            temasDeInteres: equipoEmpresas.temasDeInteres,
            empresa: equipoEmpresas.empresa,
        });
    }

    save() {
        this.isSaving = true;
        const equipoEmpresas = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.equipoEmpresasService.update(equipoEmpresas));
        } else {
            this.subscribeToSaveResponse(this.equipoEmpresasService.create(equipoEmpresas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<EquipoEmpresas>>) {
        result.subscribe((res: HttpResponse<EquipoEmpresas>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `EquipoEmpresas ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/equipo-empresas');
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

    private createFromForm(): EquipoEmpresas {
        return {
            ...new EquipoEmpresas(),
            id: this.form.get(['id']).value,
            nombre: this.form.get(['nombre']).value,
            telefono: this.form.get(['telefono']).value,
            correo: this.form.get(['correo']).value,
            direccion: this.form.get(['direccion']).value,
            descripcion: this.form.get(['descripcion']).value,
            logo: this.form.get(['logo']).value,
            logoContentType: this.form.get(['logoContentType']).value,
            paginaWeb: this.form.get(['paginaWeb']).value,
            conocimientosQueDomina: this.form.get(['conocimientosQueDomina']).value,
            temasDeInteres: this.form.get(['temasDeInteres']).value,
            empresa: this.form.get(['empresa']).value,
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
                this.equipoEmpresas[fieldName] = data;
                this.equipoEmpresas[fieldName + 'ContentType'] = 'image/jpeg';
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
        this.dataUtils.clearInputImage(this.equipoEmpresas, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareEmpresa(first: Empresa, second: Empresa): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackEmpresaById(index: number, item: Empresa) {
        return item.id;
    }
}
