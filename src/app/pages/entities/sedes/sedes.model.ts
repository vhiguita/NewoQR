import { BaseEntity } from 'src/model/base-entity';
import { Ciudad } from '../ciudad/ciudad.model';

export class Sedes implements BaseEntity {
    constructor(
        public id?: number,
        public nombreSede?: string,
        public coordenadaX?: number,
        public coordenadaY?: number,
        public direccion?: string,
        public telefonoComunidad?: string,
        public telefonoNegocio?: string,
        public descripcionSede?: any,
        public horario?: string,
        public video?: string,
        public imagen1ContentType?: string,
        public imagen1?: any,
        public imagen2ContentType?: string,
        public imagen2?: any,
        public imagen3ContentType?: string,
        public imagen3?: any,
        public imagen4ContentType?: string,
        public imagen4?: any,
        public imagen5ContentType?: string,
        public imagen5?: any,
        public imagen6ContentType?: string,
        public imagen6?: any,
        public ciudad?: Ciudad,
    ) {
    }
}
