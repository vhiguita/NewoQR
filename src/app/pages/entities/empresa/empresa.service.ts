import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Empresa } from './empresa.model';

@Injectable({ providedIn: 'root'})
export class EmpresaService {
    private resourceUrl = ApiService.API_URL + '/empresas';

    constructor(protected http: HttpClient) { }

    create(empresa: Empresa): Observable<HttpResponse<Empresa>> {
        return this.http.post<Empresa>(this.resourceUrl, empresa, { observe: 'response'});
    }

    update(empresa: Empresa): Observable<HttpResponse<Empresa>> {
        return this.http.put(this.resourceUrl, empresa, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Empresa>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Empresa[]>> {
        const options = createRequestOption(req);
        return this.http.get<Empresa[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
