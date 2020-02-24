import { BaseEntity } from 'src/model/base-entity';

export class TipoEspacio implements BaseEntity {
    constructor(
        public id?: number,
        public tipoEspacio?: string,
    ) {
    }
}
