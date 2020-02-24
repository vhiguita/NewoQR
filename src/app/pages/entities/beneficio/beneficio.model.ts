import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';

export const enum Beneficiosd {
    'Market',
    'Entrada_Miembro',
    'Espacios_Reserva',
    'Invitados',
    'Landings'
}

export class Beneficio implements BaseEntity {
    constructor(
        public id?: number,
        public tipoBeneficio?: Beneficiosd,
        public descuento?: number,
        public user?: User,
    ) {
    }
}
