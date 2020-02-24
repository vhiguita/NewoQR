import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { RegistroFacturacion } from './registro-facturacion.model';

@Injectable({ providedIn: 'root'})
export class RegistroFacturacionService {
    private resourceUrl = ApiService.API_URL + '/registro-facturacions';

    constructor(protected http: HttpClient) { }

    create(registroFacturacion: RegistroFacturacion): Observable<HttpResponse<RegistroFacturacion>> {
        return this.http.post<RegistroFacturacion>(this.resourceUrl, registroFacturacion, { observe: 'response'});
    }

    update(registroFacturacion: RegistroFacturacion): Observable<HttpResponse<RegistroFacturacion>> {
        return this.http.put(this.resourceUrl, registroFacturacion, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<RegistroFacturacion>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<RegistroFacturacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegistroFacturacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
