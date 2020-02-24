import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { EspaciosReserva } from './espacios-reserva.model';

@Injectable({ providedIn: 'root'})
export class EspaciosReservaService {
    private resourceUrl = ApiService.API_URL + '/espacios-reservas';

    constructor(protected http: HttpClient) { }

    create(espaciosReserva: EspaciosReserva): Observable<HttpResponse<EspaciosReserva>> {
        return this.http.post<EspaciosReserva>(this.resourceUrl, espaciosReserva, { observe: 'response'});
    }

    update(espaciosReserva: EspaciosReserva): Observable<HttpResponse<EspaciosReserva>> {
        return this.http.put(this.resourceUrl, espaciosReserva, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<EspaciosReserva>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<EspaciosReserva[]>> {
        const options = createRequestOption(req);
        return this.http.get<EspaciosReserva[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
