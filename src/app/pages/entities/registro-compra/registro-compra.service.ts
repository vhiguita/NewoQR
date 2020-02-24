import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { RegistroCompra } from './registro-compra.model';

@Injectable({ providedIn: 'root'})
export class RegistroCompraService {
    private resourceUrl = ApiService.API_URL + '/registro-compras';

    constructor(protected http: HttpClient) { }

    create(registroCompra: RegistroCompra): Observable<HttpResponse<RegistroCompra>> {
        return this.http.post<RegistroCompra>(this.resourceUrl, registroCompra, { observe: 'response'});
    }

    update(registroCompra: RegistroCompra): Observable<HttpResponse<RegistroCompra>> {
        return this.http.put(this.resourceUrl, registroCompra, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<RegistroCompra>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<RegistroCompra[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegistroCompra[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
