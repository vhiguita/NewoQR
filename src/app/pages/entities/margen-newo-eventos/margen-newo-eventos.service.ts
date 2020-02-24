import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MargenNewoEventos } from './margen-newo-eventos.model';

@Injectable({ providedIn: 'root'})
export class MargenNewoEventosService {
    private resourceUrl = ApiService.API_URL + '/margen-newo-eventos';

    constructor(protected http: HttpClient) { }

    create(margenNewoEventos: MargenNewoEventos): Observable<HttpResponse<MargenNewoEventos>> {
        return this.http.post<MargenNewoEventos>(this.resourceUrl, margenNewoEventos, { observe: 'response'});
    }

    update(margenNewoEventos: MargenNewoEventos): Observable<HttpResponse<MargenNewoEventos>> {
        return this.http.put(this.resourceUrl, margenNewoEventos, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MargenNewoEventos>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MargenNewoEventos[]>> {
        const options = createRequestOption(req);
        return this.http.get<MargenNewoEventos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
