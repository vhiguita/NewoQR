import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Landing } from './landing.model';

@Injectable({ providedIn: 'root'})
export class LandingService {
    private resourceUrl = ApiService.API_URL + '/landings';

    constructor(protected http: HttpClient) { }

    create(landing: Landing): Observable<HttpResponse<Landing>> {
        return this.http.post<Landing>(this.resourceUrl, landing, { observe: 'response'});
    }

    update(landing: Landing): Observable<HttpResponse<Landing>> {
        return this.http.put(this.resourceUrl, landing, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Landing>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Landing[]>> {
        const options = createRequestOption(req);
        return this.http.get<Landing[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
