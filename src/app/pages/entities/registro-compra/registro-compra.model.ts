import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { TipoRegistroCompra } from '../tipo-registro-compra/tipo-registro-compra.model';

export class RegistroCompra implements BaseEntity {
    constructor(
        public id?: number,
        public valor?: number,
        public fechaRegistro?: any,
        public idTransaccion?: number,
        public user?: User,
        public tipoRegistro?: TipoRegistroCompra,
    ) {
    }
}
