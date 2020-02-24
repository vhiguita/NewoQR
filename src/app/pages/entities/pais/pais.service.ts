import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Pais } from './pais.model';

@Injectable({ providedIn: 'root'})
export class PaisService {
    private resourceUrl = ApiService.API_URL + '/pais';

    constructor(protected http: HttpClient) { }

    create(pais: Pais): Observable<HttpResponse<Pais>> {
        return this.http.post<Pais>(this.resourceUrl, pais, { observe: 'response'});
    }

    update(pais: Pais): Observable<HttpResponse<Pais>> {
        return this.http.put(this.resourceUrl, pais, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Pais>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Pais[]>> {
        const options = createRequestOption(req);
        return this.http.get<Pais[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
