import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { RecursosFisicos } from './recursos-fisicos.model';

@Injectable({ providedIn: 'root'})
export class RecursosFisicosService {
    private resourceUrl = ApiService.API_URL + '/recursos-fisicos';

    constructor(protected http: HttpClient) { }

    create(recursosFisicos: RecursosFisicos): Observable<HttpResponse<RecursosFisicos>> {
        return this.http.post<RecursosFisicos>(this.resourceUrl, recursosFisicos, { observe: 'response'});
    }

    update(recursosFisicos: RecursosFisicos): Observable<HttpResponse<RecursosFisicos>> {
        return this.http.put(this.resourceUrl, recursosFisicos, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<RecursosFisicos>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<RecursosFisicos[]>> {
        const options = createRequestOption(req);
        return this.http.get<RecursosFisicos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
