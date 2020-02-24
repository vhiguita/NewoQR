import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Invitacion } from './invitacion.model';

@Injectable({ providedIn: 'root'})
export class InvitacionService {
    private resourceUrl = ApiService.API_URL + '/invitacions';

    constructor(protected http: HttpClient) { }

    create(invitacion: Invitacion): Observable<HttpResponse<Invitacion>> {
        return this.http.post<Invitacion>(this.resourceUrl, invitacion, { observe: 'response'});
    }

    update(invitacion: Invitacion): Observable<HttpResponse<Invitacion>> {
        return this.http.put(this.resourceUrl, invitacion, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Invitacion>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Invitacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Invitacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
