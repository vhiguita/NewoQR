import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MargenNewoProductos } from './margen-newo-productos.model';

@Injectable({ providedIn: 'root'})
export class MargenNewoProductosService {
    private resourceUrl = ApiService.API_URL + '/margen-newo-productos';

    constructor(protected http: HttpClient) { }

    create(margenNewoProductos: MargenNewoProductos): Observable<HttpResponse<MargenNewoProductos>> {
        return this.http.post<MargenNewoProductos>(this.resourceUrl, margenNewoProductos, { observe: 'response'});
    }

    update(margenNewoProductos: MargenNewoProductos): Observable<HttpResponse<MargenNewoProductos>> {
        return this.http.put(this.resourceUrl, margenNewoProductos, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MargenNewoProductos>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MargenNewoProductos[]>> {
        const options = createRequestOption(req);
        return this.http.get<MargenNewoProductos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
