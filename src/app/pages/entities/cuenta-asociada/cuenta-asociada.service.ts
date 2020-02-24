import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { CuentaAsociada } from './cuenta-asociada.model';

@Injectable({ providedIn: 'root'})
export class CuentaAsociadaService {
    private resourceUrl = ApiService.API_URL + '/cuenta-asociadas';

    constructor(protected http: HttpClient) { }

    create(cuentaAsociada: CuentaAsociada): Observable<HttpResponse<CuentaAsociada>> {
        return this.http.post<CuentaAsociada>(this.resourceUrl, cuentaAsociada, { observe: 'response'});
    }

    update(cuentaAsociada: CuentaAsociada): Observable<HttpResponse<CuentaAsociada>> {
        return this.http.put(this.resourceUrl, cuentaAsociada, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<CuentaAsociada>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<CuentaAsociada[]>> {
        const options = createRequestOption(req);
        return this.http.get<CuentaAsociada[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
