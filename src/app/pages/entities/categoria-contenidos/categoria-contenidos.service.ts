import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { CategoriaContenidos } from './categoria-contenidos.model';

@Injectable({ providedIn: 'root'})
export class CategoriaContenidosService {
    private resourceUrl = ApiService.API_URL + '/categoria-contenidos';

    constructor(protected http: HttpClient) { }

    create(categoriaContenidos: CategoriaContenidos): Observable<HttpResponse<CategoriaContenidos>> {
        return this.http.post<CategoriaContenidos>(this.resourceUrl, categoriaContenidos, { observe: 'response'});
    }

    update(categoriaContenidos: CategoriaContenidos): Observable<HttpResponse<CategoriaContenidos>> {
        return this.http.put(this.resourceUrl, categoriaContenidos, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<CategoriaContenidos>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<CategoriaContenidos[]>> {
        const options = createRequestOption(req);
        return this.http.get<CategoriaContenidos[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
