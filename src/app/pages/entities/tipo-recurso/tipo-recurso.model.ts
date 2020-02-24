import { BaseEntity } from 'src/model/base-entity';

export class TipoRecurso implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
    ) {
    }
}
