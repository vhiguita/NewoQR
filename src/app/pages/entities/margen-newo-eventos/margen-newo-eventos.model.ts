import { BaseEntity } from 'src/model/base-entity';
import { Evento } from '../evento/evento.model';

export class MargenNewoEventos implements BaseEntity {
    constructor(
        public id?: number,
        public porcentajeMargen?: number,
        public evento?: Evento,
    ) {
    }
}
