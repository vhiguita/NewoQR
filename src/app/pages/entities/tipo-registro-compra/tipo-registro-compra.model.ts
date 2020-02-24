import { BaseEntity } from 'src/model/base-entity';

export class TipoRegistroCompra implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
    ) {
    }
}
