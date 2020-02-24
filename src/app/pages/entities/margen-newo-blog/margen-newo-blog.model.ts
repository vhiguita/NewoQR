import { BaseEntity } from 'src/model/base-entity';
import { Blog } from '../blog/blog.model';

export class MargenNewoBlog implements BaseEntity {
    constructor(
        public id?: number,
        public porcentajeMargen?: number,
        public blog?: Blog,
    ) {
    }
}
