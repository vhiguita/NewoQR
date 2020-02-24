import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { VideoBlog } from './video-blog.model';

@Injectable({ providedIn: 'root'})
export class VideoBlogService {
    private resourceUrl = ApiService.API_URL + '/video-blogs';

    constructor(protected http: HttpClient) { }

    create(videoBlog: VideoBlog): Observable<HttpResponse<VideoBlog>> {
        return this.http.post<VideoBlog>(this.resourceUrl, videoBlog, { observe: 'response'});
    }

    update(videoBlog: VideoBlog): Observable<HttpResponse<VideoBlog>> {
        return this.http.put(this.resourceUrl, videoBlog, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<VideoBlog>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<VideoBlog[]>> {
        const options = createRequestOption(req);
        return this.http.get<VideoBlog[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
