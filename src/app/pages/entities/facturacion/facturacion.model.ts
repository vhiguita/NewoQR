import { BaseEntity } from 'src/model/base-entity';
import { Empresa } from '../empresa/empresa.model';
import { CuentaAsociada } from '../cuenta-asociada/cuenta-asociada.model';

export const enum TipoPersonad {
    'NATURAL',
    'JURIDICA'
}

export const enum PeriodicidadFacturaciond {
    'SEMANAL',
    'QUINCENAL',
    'MENSUAL',
    'BIMESTRAL',
    'TRIMESTRAL'
}

export class Facturacion implements BaseEntity {
    constructor(
        public id?: number,
        public titularFactura?: string,
        public tipoPersona?: TipoPersonad,
        public periodicidadFacturacion?: PeriodicidadFacturaciond,
        public maximoMonto?: number,
        public valor?: number,
        public empresa?: Empresa,
        public identificacion?: CuentaAsociada,
    ) {
    }
}
