import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ProductosServicios } from './productos-servicios.model';

@Injectable({ providedIn: 'root'})
export class ProductosServiciosService {
    private resourceUrl = ApiService.API_URL + '/productos-servicios';

    constructor(protected http: HttpClient) { }

    create(productosServicios: ProductosServicios): Observable<HttpResponse<ProductosServicios>> {
        return this.http.post<ProductosServicios>(this.resourceUrl, productosServicios, { observe: 'response'});
    }

    update(productosServicios: ProductosServicios): Observable<HttpResponse<ProductosServicios>> {
        return this.http.put(this.resourceUrl, productosServicios, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ProductosServicios>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ProductosServicios[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductosServicios[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
