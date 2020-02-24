import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { EspacioLibre } from './espacio-libre.model';

@Injectable({ providedIn: 'root'})
export class EspacioLibreService {
    private resourceUrl = ApiService.API_URL + '/espacio-libres';

    constructor(protected http: HttpClient) { }

    create(espacioLibre: EspacioLibre): Observable<HttpResponse<EspacioLibre>> {
        return this.http.post<EspacioLibre>(this.resourceUrl, espacioLibre, { observe: 'response'});
    }

    update(espacioLibre: EspacioLibre): Observable<HttpResponse<EspacioLibre>> {
        return this.http.put(this.resourceUrl, espacioLibre, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<EspacioLibre>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<EspacioLibre[]>> {
        const options = createRequestOption(req);
        return this.http.get<EspacioLibre[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
