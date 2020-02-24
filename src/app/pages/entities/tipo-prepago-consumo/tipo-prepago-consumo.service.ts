import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { TipoPrepagoConsumo } from './tipo-prepago-consumo.model';

@Injectable({ providedIn: 'root'})
export class TipoPrepagoConsumoService {
    private resourceUrl = ApiService.API_URL + '/tipo-prepago-consumos';

    constructor(protected http: HttpClient) { }

    create(tipoPrepagoConsumo: TipoPrepagoConsumo): Observable<HttpResponse<TipoPrepagoConsumo>> {
        return this.http.post<TipoPrepagoConsumo>(this.resourceUrl, tipoPrepagoConsumo, { observe: 'response'});
    }

    update(tipoPrepagoConsumo: TipoPrepagoConsumo): Observable<HttpResponse<TipoPrepagoConsumo>> {
        return this.http.put(this.resourceUrl, tipoPrepagoConsumo, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<TipoPrepagoConsumo>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<TipoPrepagoConsumo[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoPrepagoConsumo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
