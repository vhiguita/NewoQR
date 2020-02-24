import { BaseEntity } from 'src/model/base-entity';
import { CategoriaContenidos } from '../categoria-contenidos/categoria-contenidos.model';

export const enum TipoGrupod {
    'INTERNO',
    'EXTERNO',
    'PATROCINADO',
    'PUBLICO'
}

export const enum TipoConsumod {
    'GRATIS',
    'PAGO'
}

export const enum Impuestod {
    'IVA19',
    'IVA6',
    'IVA0',
    'ICO',
    'IPOCONSUMO8'
}

export class Grupos implements BaseEntity {
    constructor(
        public id?: number,
        public nombreGrupo?: string,
        public instagram?: string,
        public facebook?: string,
        public twiter?: string,
        public linkedIn?: string,
        public tipoGrupo?: TipoGrupod,
        public tipoConsumo?: TipoConsumod,
        public valorSuscripcion?: number,
        public impuesto?: Impuestod,
        public reglasGrupo?: any,
        public audioContentType?: string,
        public audio?: any,
        public videoContentType?: string,
        public video?: any,
        public imagen1ContentType?: string,
        public imagen1?: any,
        public imagen2ContentType?: string,
        public imagen2?: any,
        public bannerContentType?: string,
        public banner?: any,
        public categoriaGrupo?: CategoriaContenidos,
    ) {
    }
}
