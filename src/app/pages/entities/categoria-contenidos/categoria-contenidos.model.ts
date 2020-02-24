import { BaseEntity } from 'src/model/base-entity';

export class CategoriaContenidos implements BaseEntity {
    constructor(
        public id?: number,
        public categoria?: string,
    ) {
    }
}
