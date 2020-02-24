import { BaseEntity } from 'src/model/base-entity';
import { Sedes } from '../sedes/sedes.model';

export const enum Impuestod {
    'IVA19',
    'IVA6',
    'IVA0',
    'ICO',
    'IPOCONSUMO8'
}

export class Landing implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public facilidades?: string,
        public telefonoNegocio?: string,
        public numeroPuestos?: number,
        public tarifaMensual?: number,
        public impuesto?: Impuestod,
        public imagen1ContentType?: string,
        public imagen1?: any,
        public imagen2ContentType?: string,
        public imagen2?: any,
        public imagen3ContentType?: string,
        public imagen3?: any,
        public sede?: Sedes,
    ) {
    }
}
