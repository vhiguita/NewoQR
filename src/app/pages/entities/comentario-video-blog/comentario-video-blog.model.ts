import { BaseEntity } from 'src/model/base-entity';
import { VideoBlog } from '../video-blog/video-blog.model';
import { User } from '../../../services/user/user.model';

export class ComentarioVideoBlog implements BaseEntity {
    constructor(
        public id?: number,
        public comentario?: any,
        public fecha?: any,
        public meGusta?: boolean,
        public seguir?: boolean,
        public videoBlog?: VideoBlog,
        public idUser?: User,
    ) {
        this.meGusta = false;
        this.seguir = false;
    }
}
