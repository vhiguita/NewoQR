import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { HostSede } from './host-sede.model';

@Injectable({ providedIn: 'root'})
export class HostSedeService {
    private resourceUrl = ApiService.API_URL + '/host-sedes';

    constructor(protected http: HttpClient) { }

    create(hostSede: HostSede): Observable<HttpResponse<HostSede>> {
        return this.http.post<HostSede>(this.resourceUrl, hostSede, { observe: 'response'});
    }

    update(hostSede: HostSede): Observable<HttpResponse<HostSede>> {
        return this.http.put(this.resourceUrl, hostSede, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<HostSede>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<HostSede[]>> {
        const options = createRequestOption(req);
        return this.http.get<HostSede[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
