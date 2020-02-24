import { BaseEntity } from 'src/model/base-entity';
import { Sedes } from '../sedes/sedes.model';
import { TipoEspacio } from '../tipo-espacio/tipo-espacio.model';

export const enum Impuestod {
    'IVA19',
    'IVA6',
    'IVA0',
    'ICO',
    'IPOCONSUMO8'
}

export class EspacioLibre implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public capacidadInstalada?: number,
        public wifi?: string,
        public tarifa1hMiembro?: number,
        public tarifa2hMiembro?: number,
        public tarifa3hMiembro?: number,
        public tarifa4hMiembro?: number,
        public tarifa5hMiembro?: number,
        public tarifa6hMiembro?: number,
        public tarifa7hMiembro?: number,
        public tarifa8hMiembro?: number,
        public tarifa1hInvitado?: number,
        public tarifa2hInvitado?: number,
        public tarifa3hInvitado?: number,
        public tarifa4hInvitado?: number,
        public tarifa5hInvitado?: number,
        public tarifa6hInvitado?: number,
        public tarifa7hInvitado?: number,
        public tarifa8hInvitado?: number,
        public impuesto?: Impuestod,
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
        public sede?: Sedes,
        public tipoEspacio?: TipoEspacio,
    ) {
    }
}
