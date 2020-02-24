import { BaseEntity } from 'src/model/base-entity';

export class Pais implements BaseEntity {
    constructor(
        public id?: number,
        public nombrePais?: string,
    ) {
    }
}
