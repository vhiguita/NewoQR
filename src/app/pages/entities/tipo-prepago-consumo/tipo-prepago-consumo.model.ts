import { BaseEntity } from 'src/model/base-entity';
import { Beneficio } from '../beneficio/beneficio.model';

export class TipoPrepagoConsumo implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: string,
        public valorMinimo?: number,
        public valorMaximo?: number,
        public tipoBeneficio?: Beneficio,
    ) {
    }
}
