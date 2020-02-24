import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Evento } from './evento.model';

@Injectable({ providedIn: 'root'})
export class EventoService {
    private resourceUrl = ApiService.API_URL + '/eventos';

    constructor(protected http: HttpClient) { }

    create(evento: Evento): Observable<HttpResponse<Evento>> {
        return this.http.post<Evento>(this.resourceUrl, evento, { observe: 'response'});
    }

    update(evento: Evento): Observable<HttpResponse<Evento>> {
        return this.http.put(this.resourceUrl, evento, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Evento>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Evento[]>> {
        const options = createRequestOption(req);
        return this.http.get<Evento[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
