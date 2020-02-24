import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';

export const enum Impuestod {
    'IVA19',
    'IVA6',
    'IVA0',
    'ICO',
    'IPOCONSUMO8'
}

export class ProductosServicios implements BaseEntity {
    constructor(
        public id?: number,
        public nombreProducto?: string,
        public descripcion?: string,
        public inventariables?: boolean,
        public valor?: number,
        public impuesto?: Impuestod,
        public video?: string,
        public imagen1ContentType?: string,
        public imagen1?: any,
        public imagen2ContentType?: string,
        public imagen2?: any,
        public imagen3ContentType?: string,
        public imagen3?: any,
        public imagen4ContentType?: string,
        public imagen4?: any,
        public imagen5ContentType?: string,
        public imagen5?: any,
        public imagen6ContentType?: string,
        public imagen6?: any,
        public web?: string,
        public user?: User,
    ) {
        this.inventariables = false;
    }
}
