import { BaseEntity } from 'src/model/base-entity';

export class CuentaAsociada implements BaseEntity {
    constructor(
        public id?: number,
        public identificaciontitular?: string,
        public nombreTitular?: string,
        public apellidoTitular?: string,
        public numeroCuenta?: string,
        public tipoCuenta?: string,
        public codigoSeguridad?: string,
        public fechaVencimiento?: any,
    ) {
    }
}
