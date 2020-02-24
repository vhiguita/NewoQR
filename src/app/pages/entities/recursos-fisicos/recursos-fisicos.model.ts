import { BaseEntity } from 'src/model/base-entity';
import { Sedes } from '../sedes/sedes.model';
import { TipoRecurso } from '../tipo-recurso/tipo-recurso.model';

export const enum TipoRecursod {
    'Tiempo',
    'Cantidad'
}

export const enum Impuestod {
    'IVA19',
    'IVA6',
    'IVA0',
    'ICO',
    'IPOCONSUMO8'
}

export class RecursosFisicos implements BaseEntity {
    constructor(
        public id?: number,
        public recurso?: string,
        public tipo?: TipoRecursod,
        public unidadMedida?: string,
        public valorUnitario?: number,
        public valor1H?: number,
        public valor2H?: number,
        public valor3H?: number,
        public valor4H?: number,
        public valor5H?: number,
        public valor6H?: number,
        public valor7H?: number,
        public valor8H?: number,
        public valor9H?: number,
        public valor10H?: number,
        public valor11H?: number,
        public valor12H?: number,
        public impuesto?: Impuestod,
        public fotoContentType?: string,
        public foto?: any,
        public videoContentType?: string,
        public video?: any,
        public sede?: Sedes,
        public tipoRecurso?: TipoRecurso,
    ) {
    }
}
