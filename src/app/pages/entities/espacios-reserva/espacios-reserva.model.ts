import { BaseEntity } from 'src/model/base-entity';
import { Sedes } from '../sedes/sedes.model';

export const enum Impuestod {
    'IVA19',
    'IVA6',
    'IVA0',
    'ICO',
    'IPOCONSUMO8'
}

export class EspaciosReserva implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public facilidades?: string,
        public capacidad?: number,
        public apertura?: string,
        public cierre?: string,
        public wifi?: string,
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
        public tarifa1Hora?: number,
        public tarifa2Hora?: number,
        public tarifa3Hora?: number,
        public tarifa4Hora?: number,
        public tarifa5Hora?: number,
        public tarifa6Hora?: number,
        public tarifa7Hora?: number,
        public tarifa8Hora?: number,
        public impuesto?: Impuestod,
        public sede?: Sedes,
    ) {
    }
}
