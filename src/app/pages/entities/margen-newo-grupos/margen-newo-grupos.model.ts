import { BaseEntity } from 'src/model/base-entity';
import { Grupos } from '../grupos/grupos.model';

export class MargenNewoGrupos implements BaseEntity {
    constructor(
        public id?: number,
        public porcentajeMargen?: number,
        public grupo?: Grupos,
    ) {
    }
}
