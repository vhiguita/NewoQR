import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MargenNewoBlog } from './margen-newo-blog.model';

@Injectable({ providedIn: 'root'})
export class MargenNewoBlogService {
    private resourceUrl = ApiService.API_URL + '/margen-newo-blogs';

    constructor(protected http: HttpClient) { }

    create(margenNewoBlog: MargenNewoBlog): Observable<HttpResponse<MargenNewoBlog>> {
        return this.http.post<MargenNewoBlog>(this.resourceUrl, margenNewoBlog, { observe: 'response'});
    }

    update(margenNewoBlog: MargenNewoBlog): Observable<HttpResponse<MargenNewoBlog>> {
        return this.http.put(this.resourceUrl, margenNewoBlog, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MargenNewoBlog>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MargenNewoBlog[]>> {
        const options = createRequestOption(req);
        return this.http.get<MargenNewoBlog[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
