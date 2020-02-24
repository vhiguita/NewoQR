import { BaseEntity } from 'src/model/base-entity';
import { EquipoEmpresas } from '../equipo-empresas/equipo-empresas.model';
import { User } from '../../../services/user/user.model';

export class MiembrosEquipoEmpresas implements BaseEntity {
    constructor(
        public id?: number,
        public equipo?: EquipoEmpresas,
        public miembro?: User,
    ) {
    }
}
