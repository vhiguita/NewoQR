import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { CategoriaContenidos } from '../categoria-contenidos/categoria-contenidos.model';
import { Grupos } from '../grupos/grupos.model';
import { ComentarioBlog } from '../comentario-blog/comentario-blog.model';

export const enum Categoriad {
    'GENERAL',
    'DE_GRUPO',
    'CORPORATIVO',
    'INSTITUCIONAL',
    'INTERNO'
}

export const enum EstadoPublicaciond {
    'BORRADOR',
    'EN_REVISION',
    'APROBADO',
    'PUBLICADO',
    'RECHAZADO'
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

export class Blog implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public descripcion?: string,
        public tipoContenido?: Categoriad,
        public contenido?: any,
        public fecha?: any,
        public audioContentType?: string,
        public audio?: any,
        public video?: string,
        public imagen1ContentType?: string,
        public imagen1?: any,
        public imagen2ContentType?: string,
        public imagen2?: any,
        public bannerContentType?: string,
        public banner?: any,
        public estadoPublicacion?: EstadoPublicaciond,
        public tipoConsumo?: TipoConsumod,
        public valor?: number,
        public impuesto?: Impuestod,
        public vistas?: number,
        public meGusta?: number,
        public seguidores?: number,
        public idUser?: User,
        public categoriaBlog?: CategoriaContenidos,
        public grupos?: Grupos,
        public comentarioBlogs?: ComentarioBlog[],
    ) {
    }
}
