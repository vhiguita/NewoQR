import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { CategoriaContenidos } from '../categoria-contenidos/categoria-contenidos.model';
import { ComentarioVideoBlog } from '../comentario-video-blog/comentario-video-blog.model';

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

export class VideoBlog implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public descripcion?: string,
        public tipoContenido?: Categoriad,
        public contenido?: any,
        public fecha?: any,
        public video?: string,
        public estadoPublicacion?: EstadoPublicaciond,
        public tipoConsumo?: TipoConsumod,
        public valor?: number,
        public impuesto?: Impuestod,
        public vistas?: number,
        public meGusta?: number,
        public seguidores?: number,
        public idUser?: User,
        public categoriaBlog?: CategoriaContenidos,
        public comentarioVideoBlogs?: ComentarioVideoBlog[],
    ) {
    }
}
