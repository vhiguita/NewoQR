import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { Pais } from '../pais/pais.model';

export const enum TipoDocumentod {
    'Cedula',
    'Cedula_Extranjeria',
    'Pasaporte',
    'Otro'
}

export const enum Generod {
    'Masculino',
    'Femenino',
    'Otro'
}

export class Miembros implements BaseEntity {
    constructor(
        public id?: number,
        public idUser?: number,
        public nombre?: string,
        public apellido?: string,
        public login?: string,
        public tipoDocumento?: TipoDocumentod,
        public identificacion?: number,
        public fechaNacimiento?: any,
        public fechaRegistro?: any,
        public genero?: Generod,
        public celular?: string,
        public biografia?: any,
        public foto1ContentType?: string,
        public foto1?: any,
        public foto2ContentType?: string,
        public foto2?: any,
        public foto3ContentType?: string,
        public foto3?: any,
        public conocimientosQueDomina?: string,
        public temasDeInteres?: string,
        public facebook?: string,
        public instagram?: string,
        public idGoogle?: string,
        public twiter?: string,
        public derechosDeCompra?: boolean,
        public accesoIlimitado?: boolean,
        public aliado?: boolean,
        public host?: boolean,
        public user?: User,
        public nacionalidad?: Pais,
    ) {
        this.derechosDeCompra = false;
        this.accesoIlimitado = false;
        this.aliado = false;
        this.host = false;
    }
}
