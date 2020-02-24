import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { PrepagoConsumo } from './prepago-consumo.model';

@Injectable({ providedIn: 'root'})
export class PrepagoConsumoService {
    private resourceUrl = ApiService.API_URL + '/prepago-consumos';

    constructor(protected http: HttpClient) { }

    create(prepagoConsumo: PrepagoConsumo): Observable<HttpResponse<PrepagoConsumo>> {
        return this.http.post<PrepagoConsumo>(this.resourceUrl, prepagoConsumo, { observe: 'response'});
    }

    update(prepagoConsumo: PrepagoConsumo): Observable<HttpResponse<PrepagoConsumo>> {
        return this.http.put(this.resourceUrl, prepagoConsumo, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<PrepagoConsumo>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<PrepagoConsumo[]>> {
        const options = createRequestOption(req);
        return this.http.get<PrepagoConsumo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
