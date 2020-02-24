import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { EspaciosReserva } from '../espacios-reserva/espacios-reserva.model';

export const enum EstadoReservad {
    'Cancelada',
    'Activa',
    'Reservada',
    'Ocupada',
    'Extendida',
    'Cerrada'
}

export class Reservas implements BaseEntity {
    constructor(
        public id?: number,
        public registroFechaEntrada?: any,
        public registroFechaSalida?: any,
        public estadoReserva?: EstadoReservad,
        public titulo?: string,
        public descripcion?: string,
        public user?: User,
        public espacio?: EspaciosReserva,
    ) {
    }
}
