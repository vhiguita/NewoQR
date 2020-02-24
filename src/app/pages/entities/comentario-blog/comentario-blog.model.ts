import { BaseEntity } from 'src/model/base-entity';
import { Blog } from '../blog/blog.model';
import { User } from '../../../services/user/user.model';

export class ComentarioBlog implements BaseEntity {
    constructor(
        public id?: number,
        public comentario?: any,
        public fecha?: any,
        public meGusta?: boolean,
        public seguir?: boolean,
        public blog?: Blog,
        public idUser?: User,
    ) {
        this.meGusta = false;
        this.seguir = false;
    }
}
