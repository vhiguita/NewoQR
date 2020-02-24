import { BaseEntity } from 'src/model/base-entity';
import { Pais } from '../pais/pais.model';

export class Ciudad implements BaseEntity {
    constructor(
        public id?: number,
        public nombreCiudad?: string,
        public pais?: Pais,
    ) {
    }
}
