import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ConsumoMarket } from './consumo-market.model';

@Injectable({ providedIn: 'root'})
export class ConsumoMarketService {
    private resourceUrl = ApiService.API_URL + '/consumo-markets';

    constructor(protected http: HttpClient) { }

    create(consumoMarket: ConsumoMarket): Observable<HttpResponse<ConsumoMarket>> {
        return this.http.post<ConsumoMarket>(this.resourceUrl, consumoMarket, { observe: 'response'});
    }

    update(consumoMarket: ConsumoMarket): Observable<HttpResponse<ConsumoMarket>> {
        return this.http.put(this.resourceUrl, consumoMarket, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ConsumoMarket>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ConsumoMarket[]>> {
        const options = createRequestOption(req);
        return this.http.get<ConsumoMarket[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
