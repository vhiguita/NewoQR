import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Beneficio } from './beneficio.model';

@Injectable({ providedIn: 'root'})
export class BeneficioService {
    private resourceUrl = ApiService.API_URL + '/beneficios';

    constructor(protected http: HttpClient) { }

    create(beneficio: Beneficio): Observable<HttpResponse<Beneficio>> {
        return this.http.post<Beneficio>(this.resourceUrl, beneficio, { observe: 'response'});
    }

    update(beneficio: Beneficio): Observable<HttpResponse<Beneficio>> {
        return this.http.put(this.resourceUrl, beneficio, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Beneficio>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Beneficio[]>> {
        const options = createRequestOption(req);
        return this.http.get<Beneficio[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
