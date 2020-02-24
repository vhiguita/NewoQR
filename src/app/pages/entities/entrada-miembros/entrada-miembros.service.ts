import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { EntradaMiembros } from './entrada-miembros.model';

@Injectable({ providedIn: 'root'})
export class EntradaMiembrosService {
    private resourceUrl = ApiService.API_URL + '/entrada-miembros';

    constructor(protected http: HttpClient) { }

    create(entradaMiembros: EntradaMiembros): Observable<HttpResponse<EntradaMiembros>> {
        return this.http.post<EntradaMiembros>(this.resourceUrl, entradaMiembros, { observe: 'response'});
    }

    update(entradaMiembros: EntradaMiembros): Observable<HttpResponse<EntradaMiembros>> {
        return this.http.put(this.resourceUrl, entradaMiembros, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<EntradaMiembros>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<EntradaMiembros[]>> {
        const options = createRequestOption(req);
        return this.http.get<EntradaMiembros[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
