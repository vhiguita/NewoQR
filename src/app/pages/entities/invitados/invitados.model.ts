import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';

export const enum TipoDocumentod {
    'Cedula',
    'Cedula_Extranjeria',
    'Pasaporte',
    'Otro'
}

export class Invitados implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public tipoDocumento?: TipoDocumentod,
        public identificacion?: string,
        public correo?: string,
        public telefono?: string,
        public user?: User,
    ) {
    }
}
