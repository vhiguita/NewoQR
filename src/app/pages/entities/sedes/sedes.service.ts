import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Sedes } from './sedes.model';

@Injectable({ providedIn: 'root'})
export class SedesService {
    private resourceUrl = ApiService.API_URL + '/sedes';

    constructor(protected http: HttpClient) { }

    create(sedes: Sedes): Observable<HttpResponse<Sedes>> {
        return this.http.post<Sedes>(this.resourceUrl, sedes, { observe: 'response'});
    }

    update(sedes: Sedes): Observable<HttpResponse<Sedes>> {
        return this.http.put(this.resourceUrl, sedes, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Sedes>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Sedes[]>> {
        const options = createRequestOption(req);
        return this.http.get<Sedes[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
