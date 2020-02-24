import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { Chat } from '../chat/chat.model';

export const enum Estatusd {
    'EnLinea',
    'Desconectado'
}

export class ChatsListado implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public estatus?: Estatusd,
        public count?: number,
        public badge?: number,
        public time?: string,
        public sendTime?: any,
        public grupo?: boolean,
        public propietario?: User,
        public destinatario?: User,
        public chats?: Chat[],
    ) {
        this.grupo = false;
    }
}
