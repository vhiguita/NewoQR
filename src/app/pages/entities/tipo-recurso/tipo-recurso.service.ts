import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { TipoRecurso } from './tipo-recurso.model';

@Injectable({ providedIn: 'root'})
export class TipoRecursoService {
    private resourceUrl = ApiService.API_URL + '/tipo-recursos';

    constructor(protected http: HttpClient) { }

    create(tipoRecurso: TipoRecurso): Observable<HttpResponse<TipoRecurso>> {
        return this.http.post<TipoRecurso>(this.resourceUrl, tipoRecurso, { observe: 'response'});
    }

    update(tipoRecurso: TipoRecurso): Observable<HttpResponse<TipoRecurso>> {
        return this.http.put(this.resourceUrl, tipoRecurso, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<TipoRecurso>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<TipoRecurso[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoRecurso[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
