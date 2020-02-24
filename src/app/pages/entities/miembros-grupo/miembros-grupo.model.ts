import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { Grupos } from '../grupos/grupos.model';

export class MiembrosGrupo implements BaseEntity {
    constructor(
        public id?: number,
        public miembro?: User,
        public grupo?: Grupos,
    ) {
    }
}
