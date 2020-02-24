import { BaseEntity } from 'src/model/base-entity';
import { TipoRegistroCompra } from '../tipo-registro-compra/tipo-registro-compra.model';
import { User } from '../../../services/user/user.model';

export class RegistroFacturacion implements BaseEntity {
    constructor(
        public id?: number,
        public valor?: number,
        public fechaRegistro?: any,
        public fechaFacturacion?: any,
        public tipoRegistro?: TipoRegistroCompra,
        public user?: User,
    ) {
    }
}
