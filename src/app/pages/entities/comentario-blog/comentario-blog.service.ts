import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ComentarioBlog } from './comentario-blog.model';

@Injectable({ providedIn: 'root'})
export class ComentarioBlogService {
    private resourceUrl = ApiService.API_URL + '/comentario-blogs';

    constructor(protected http: HttpClient) { }

    create(comentarioBlog: ComentarioBlog): Observable<HttpResponse<ComentarioBlog>> {
        return this.http.post<ComentarioBlog>(this.resourceUrl, comentarioBlog, { observe: 'response'});
    }

    update(comentarioBlog: ComentarioBlog): Observable<HttpResponse<ComentarioBlog>> {
        return this.http.put(this.resourceUrl, comentarioBlog, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ComentarioBlog>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ComentarioBlog[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComentarioBlog[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
