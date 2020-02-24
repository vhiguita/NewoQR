import { BaseEntity } from 'src/model/base-entity';
import { ProductosServicios } from '../productos-servicios/productos-servicios.model';

export class MargenNewoProductos implements BaseEntity {
    constructor(
        public id?: number,
        public porcentajeMargen?: number,
        public producto?: ProductosServicios,
    ) {
    }
}
