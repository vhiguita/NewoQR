import { BaseEntity } from 'src/model/base-entity';
import { Sedes } from '../sedes/sedes.model';
import { User } from '../../../services/user/user.model';

export class HostSede implements BaseEntity {
    constructor(
        public id?: number,
        public sede?: Sedes,
        public miembro?: User,
    ) {
    }
}
