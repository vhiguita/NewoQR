import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Miembros } from './miembros.model';

@Injectable({ providedIn: 'root'})
export class MiembrosService {
    private resourceUrl = ApiService.API_URL + '/miembros';

    constructor(protected http: HttpClient) { }

    create(miembros: Miembros): Observable<HttpResponse<Miembros>> {
        return this.http.post<Miembros>(this.resourceUrl, miembros, { observe: 'response'});
    }

    update(miembros: Miembros): Observable<HttpResponse<Miembros>> {
        return this.http.put(this.resourceUrl, miembros, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Miembros>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Miembros[]>> {
        const options = createRequestOption(req);
        return this.http.get<Miembros[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
