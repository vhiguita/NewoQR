import { BaseEntity } from 'src/model/base-entity';
import { ChatsListado } from '../chats-listado/chats-listado.model';
import { User } from '../../../services/user/user.model';

export class Chat implements BaseEntity {
    constructor(
        public id?: number,
        public mensaje?: string,
        public sender?: number,
        public read?: boolean,
        public delivered?: boolean,
        public sent?: boolean,
        public fecha?: any,
        public chatsListado?: ChatsListado,
        public de?: User,
        public para?: User,
    ) {
        this.read = false;
        this.delivered = false;
        this.sent = false;
    }
}
