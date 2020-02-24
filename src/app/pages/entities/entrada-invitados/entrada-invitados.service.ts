import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { EntradaInvitados } from './entrada-invitados.model';

@Injectable({ providedIn: 'root'})
export class EntradaInvitadosService {
    private resourceUrl = ApiService.API_URL + '/entrada-invitados';

    constructor(protected http: HttpClient) { }

    create(entradaInvitados: EntradaInvitados): Observable<HttpResponse<EntradaInvitados>> {
        return this.http.post<EntradaInvitados>(this.resourceUrl, entradaInvitados, { observe: 'response'});
    }

    update(entradaInvitados: EntradaInvitados): Observable<HttpResponse<EntradaInvitados>> {
        return this.http.put(this.resourceUrl, entradaInvitados, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<EntradaInvitados>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<EntradaInvitados[]>> {
        const options = createRequestOption(req);
        return this.http.get<EntradaInvitados[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
