import { BaseEntity } from 'src/model/base-entity';
import { Feed } from '../feed/feed.model';
import { User } from '../../../services/user/user.model';

export class ComentarioFeed implements BaseEntity {
    constructor(
        public id?: number,
        public comentario?: any,
        public fecha?: any,
        public meGusta?: boolean,
        public seguir?: boolean,
        public feed?: Feed,
        public idUser?: User,
    ) {
        this.meGusta = false;
        this.seguir = false;
    }
}
