import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Grupos } from './grupos.model';

@Injectable({ providedIn: 'root'})
export class GruposService {
    private resourceUrl = ApiService.API_URL + '/grupos';

    constructor(protected http: HttpClient) { }

    create(grupos: Grupos): Observable<HttpResponse<Grupos>> {
        return this.http.post<Grupos>(this.resourceUrl, grupos, { observe: 'response'});
    }

    update(grupos: Grupos): Observable<HttpResponse<Grupos>> {
        return this.http.put(this.resourceUrl, grupos, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Grupos>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Grupos[]>> {
        const options = createRequestOption(req);
        return this.http.get<Grupos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
