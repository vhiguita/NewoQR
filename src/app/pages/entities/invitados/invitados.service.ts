import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Invitados } from './invitados.model';

@Injectable({ providedIn: 'root'})
export class InvitadosService {
    private resourceUrl = ApiService.API_URL + '/invitados';

    constructor(protected http: HttpClient) { }

    create(invitados: Invitados): Observable<HttpResponse<Invitados>> {
        return this.http.post<Invitados>(this.resourceUrl, invitados, { observe: 'response'});
    }

    update(invitados: Invitados): Observable<HttpResponse<Invitados>> {
        return this.http.put(this.resourceUrl, invitados, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Invitados>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Invitados[]>> {
        const options = createRequestOption(req);
        return this.http.get<Invitados[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
