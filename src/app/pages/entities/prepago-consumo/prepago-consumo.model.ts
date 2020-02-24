import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { TipoPrepagoConsumo } from '../tipo-prepago-consumo/tipo-prepago-consumo.model';

export class PrepagoConsumo implements BaseEntity {
    constructor(
        public id?: number,
        public aporte?: number,
        public saldoActual?: number,
        public fechaRegistro?: any,
        public fechaSaldoActual?: any,
        public miembro?: User,
        public tipoPrepago?: TipoPrepagoConsumo,
    ) {
    }
}
