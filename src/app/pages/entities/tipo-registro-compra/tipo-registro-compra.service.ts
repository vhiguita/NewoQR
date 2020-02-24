import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { TipoRegistroCompra } from './tipo-registro-compra.model';

@Injectable({ providedIn: 'root'})
export class TipoRegistroCompraService {
    private resourceUrl = ApiService.API_URL + '/tipo-registro-compras';

    constructor(protected http: HttpClient) { }

    create(tipoRegistroCompra: TipoRegistroCompra): Observable<HttpResponse<TipoRegistroCompra>> {
        return this.http.post<TipoRegistroCompra>(this.resourceUrl, tipoRegistroCompra, { observe: 'response'});
    }

    update(tipoRegistroCompra: TipoRegistroCompra): Observable<HttpResponse<TipoRegistroCompra>> {
        return this.http.put(this.resourceUrl, tipoRegistroCompra, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<TipoRegistroCompra>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<TipoRegistroCompra[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoRegistroCompra[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
