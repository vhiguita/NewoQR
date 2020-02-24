import { BaseEntity } from 'src/model/base-entity';
import { Empresa } from '../empresa/empresa.model';

export class EquipoEmpresas implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public telefono?: string,
        public correo?: string,
        public direccion?: string,
        public descripcion?: any,
        public logoContentType?: string,
        public logo?: any,
        public paginaWeb?: string,
        public conocimientosQueDomina?: string,
        public temasDeInteres?: string,
        public empresa?: Empresa,
    ) {
    }
}
