import { BaseEntity } from 'src/model/base-entity';
import { RecursosFisicos } from '../recursos-fisicos/recursos-fisicos.model';
import { User } from '../../../services/user/user.model';

export const enum TipoIniciod {
    'Inicio',
    'Fin'
}

export class UsoRecursoFisico implements BaseEntity {
    constructor(
        public id?: number,
        public registroFechaInicio?: any,
        public tipoRegistro?: TipoIniciod,
        public recurso?: RecursosFisicos,
        public user?: User,
    ) {
    }
}
