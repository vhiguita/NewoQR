import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';

export const enum Impuestod {
    'IVA19',
    'IVA6',
    'IVA0',
    'ICO',
    'IPOCONSUMO8'
}

export class ConsumoMarket implements BaseEntity {
    constructor(
        public id?: number,
        public totalConsumido?: number,
        public registroFechaInicial?: any,
        public registroFechaFinal?: any,
        public impuesto?: Impuestod,
        public user?: User,
    ) {
    }
}
