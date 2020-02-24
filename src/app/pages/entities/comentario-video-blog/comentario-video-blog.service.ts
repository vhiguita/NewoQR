import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ComentarioVideoBlog } from './comentario-video-blog.model';

@Injectable({ providedIn: 'root'})
export class ComentarioVideoBlogService {
    private resourceUrl = ApiService.API_URL + '/comentario-video-blogs';

    constructor(protected http: HttpClient) { }

    create(comentarioVideoBlog: ComentarioVideoBlog): Observable<HttpResponse<ComentarioVideoBlog>> {
        return this.http.post<ComentarioVideoBlog>(this.resourceUrl, comentarioVideoBlog, { observe: 'response'});
    }

    update(comentarioVideoBlog: ComentarioVideoBlog): Observable<HttpResponse<ComentarioVideoBlog>> {
        return this.http.put(this.resourceUrl, comentarioVideoBlog, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ComentarioVideoBlog>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ComentarioVideoBlog[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComentarioVideoBlog[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
