import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { CategoriaContenidos } from '../categoria-contenidos/categoria-contenidos.model';
import { ComentarioFeed } from '../comentario-feed/comentario-feed.model';

export const enum Categoriad {
    'GENERAL',
    'DE_GRUPO',
    'CORPORATIVO',
    'INSTITUCIONAL',
    'INTERNO'
}

export const enum Impuestod {
    'IVA19',
    'IVA6',
    'IVA0',
    'ICO',
    'IPOCONSUMO8'
}

export class Feed implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public descripcion?: string,
        public imagen1ContentType?: string,
        public imagen1?: any,
        public imagen2ContentType?: string,
        public imagen2?: any,
        public tipoContenido?: Categoriad,
        public contenido?: any,
        public fecha?: any,
        public impuesto?: Impuestod,
        public vistas?: number,
        public meGusta?: number,
        public seguidores?: number,
        public idUser?: User,
        public categoriaFeed?: CategoriaContenidos,
        public comentarioFeeds?: ComentarioFeed[],
    ) {
    }
}
