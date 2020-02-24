import { BaseEntity } from 'src/model/base-entity';
import { CategoriaContenidos } from '../categoria-contenidos/categoria-contenidos.model';
import { User } from '../../../services/user/user.model';
import { Grupos } from '../grupos/grupos.model';

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

export const enum Categoriad {
    'GENERAL',
    'DE_GRUPO',
    'CORPORATIVO',
    'INSTITUCIONAL',
    'INTERNO'
}

export class Evento implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEvento?: string,
        public descripcion?: string,
        public contenido?: any,
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
        public tipoConsumo?: TipoConsumod,
        public valor?: number,
        public impuesto?: Impuestod,
        public tipoEvento?: Categoriad,
        public eventoNEWO?: boolean,
        public web?: string,
        public vistas?: number,
        public meGusta?: number,
        public seguidores?: number,
        public categoriaEvento?: CategoriaContenidos,
        public idUser?: User,
        public grupos?: Grupos,
    ) {
        this.eventoNEWO = false;
    }
}
