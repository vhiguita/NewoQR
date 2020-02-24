import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MargenNewoGrupos } from './margen-newo-grupos.model';

@Injectable({ providedIn: 'root'})
export class MargenNewoGruposService {
    private resourceUrl = ApiService.API_URL + '/margen-newo-grupos';

    constructor(protected http: HttpClient) { }

    create(margenNewoGrupos: MargenNewoGrupos): Observable<HttpResponse<MargenNewoGrupos>> {
        return this.http.post<MargenNewoGrupos>(this.resourceUrl, margenNewoGrupos, { observe: 'response'});
    }

    update(margenNewoGrupos: MargenNewoGrupos): Observable<HttpResponse<MargenNewoGrupos>> {
        return this.http.put(this.resourceUrl, margenNewoGrupos, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MargenNewoGrupos>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MargenNewoGrupos[]>> {
        const options = createRequestOption(req);
        return this.http.get<MargenNewoGrupos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
