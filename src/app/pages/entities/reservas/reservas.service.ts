import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Reservas } from './reservas.model';

@Injectable({ providedIn: 'root'})
export class ReservasService {
    private resourceUrl = ApiService.API_URL + '/reservas';

    constructor(protected http: HttpClient) { }

    create(reservas: Reservas): Observable<HttpResponse<Reservas>> {
        return this.http.post<Reservas>(this.resourceUrl, reservas, { observe: 'response'});
    }

    update(reservas: Reservas): Observable<HttpResponse<Reservas>> {
        return this.http.put(this.resourceUrl, reservas, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Reservas>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Reservas[]>> {
        const options = createRequestOption(req);
        return this.http.get<Reservas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
