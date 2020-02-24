import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { TipoEspacio } from './tipo-espacio.model';

@Injectable({ providedIn: 'root'})
export class TipoEspacioService {
    private resourceUrl = ApiService.API_URL + '/tipo-espacios';

    constructor(protected http: HttpClient) { }

    create(tipoEspacio: TipoEspacio): Observable<HttpResponse<TipoEspacio>> {
        return this.http.post<TipoEspacio>(this.resourceUrl, tipoEspacio, { observe: 'response'});
    }

    update(tipoEspacio: TipoEspacio): Observable<HttpResponse<TipoEspacio>> {
        return this.http.put(this.resourceUrl, tipoEspacio, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<TipoEspacio>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<TipoEspacio[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoEspacio[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
