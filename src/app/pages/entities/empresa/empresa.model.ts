import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';

export class Empresa implements BaseEntity {
    constructor(
        public id?: number,
        public razonSocial?: string,
        public nit?: string,
        public direccion?: string,
        public telefono?: string,
        public correo?: string,
        public web?: string,
        public celular?: string,
        public biografia?: any,
        public imagen1ContentType?: string,
        public imagen1?: any,
        public imagen2ContentType?: string,
        public imagen2?: any,
        public imagen3ContentType?: string,
        public imagen3?: any,
        public facebook?: string,
        public instagram?: string,
        public idGoogle?: string,
        public twiter?: string,
        public conocimientosQueDomina?: string,
        public temasDeInteres?: string,
        public miembro?: User,
    ) {
    }
}
