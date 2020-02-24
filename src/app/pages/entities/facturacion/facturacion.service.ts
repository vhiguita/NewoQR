import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Facturacion } from './facturacion.model';

@Injectable({ providedIn: 'root'})
export class FacturacionService {
    private resourceUrl = ApiService.API_URL + '/facturacions';

    constructor(protected http: HttpClient) { }

    create(facturacion: Facturacion): Observable<HttpResponse<Facturacion>> {
        return this.http.post<Facturacion>(this.resourceUrl, facturacion, { observe: 'response'});
    }

    update(facturacion: Facturacion): Observable<HttpResponse<Facturacion>> {
        return this.http.put(this.resourceUrl, facturacion, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Facturacion>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Facturacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Facturacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
