import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ComentarioFeed } from './comentario-feed.model';

@Injectable({ providedIn: 'root'})
export class ComentarioFeedService {
    private resourceUrl = ApiService.API_URL + '/comentario-feeds';

    constructor(protected http: HttpClient) { }

    create(comentarioFeed: ComentarioFeed): Observable<HttpResponse<ComentarioFeed>> {
        return this.http.post<ComentarioFeed>(this.resourceUrl, comentarioFeed, { observe: 'response'});
    }

    update(comentarioFeed: ComentarioFeed): Observable<HttpResponse<ComentarioFeed>> {
        return this.http.put(this.resourceUrl, comentarioFeed, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ComentarioFeed>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ComentarioFeed[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComentarioFeed[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
