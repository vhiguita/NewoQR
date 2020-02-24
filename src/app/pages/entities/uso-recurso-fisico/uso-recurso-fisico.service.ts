import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { UsoRecursoFisico } from './uso-recurso-fisico.model';

@Injectable({ providedIn: 'root'})
export class UsoRecursoFisicoService {
    private resourceUrl = ApiService.API_URL + '/uso-recurso-fisicos';

    constructor(protected http: HttpClient) { }

    create(usoRecursoFisico: UsoRecursoFisico): Observable<HttpResponse<UsoRecursoFisico>> {
        return this.http.post<UsoRecursoFisico>(this.resourceUrl, usoRecursoFisico, { observe: 'response'});
    }

    update(usoRecursoFisico: UsoRecursoFisico): Observable<HttpResponse<UsoRecursoFisico>> {
        return this.http.put(this.resourceUrl, usoRecursoFisico, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<UsoRecursoFisico>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<UsoRecursoFisico[]>> {
        const options = createRequestOption(req);
        return this.http.get<UsoRecursoFisico[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
