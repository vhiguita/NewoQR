import { BaseEntity } from 'src/model/base-entity';
import { Sedes } from '../sedes/sedes.model';
import { Invitados } from '../invitados/invitados.model';

export class Invitacion implements BaseEntity {
    constructor(
        public id?: number,
        public fechaInicio?: any,
        public fechaFin?: any,
        public sede?: Sedes,
        public invitado?: Invitados,
    ) {
    }
}
