import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Ciudad } from './ciudad.model';

@Injectable({ providedIn: 'root'})
export class CiudadService {
    private resourceUrl = ApiService.API_URL + '/ciudads';

    constructor(protected http: HttpClient) { }

    create(ciudad: Ciudad): Observable<HttpResponse<Ciudad>> {
        return this.http.post<Ciudad>(this.resourceUrl, ciudad, { observe: 'response'});
    }

    update(ciudad: Ciudad): Observable<HttpResponse<Ciudad>> {
        return this.http.put(this.resourceUrl, ciudad, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Ciudad>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Ciudad[]>> {
        const options = createRequestOption(req);
        return this.http.get<Ciudad[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
