import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MiembrosGrupo } from './miembros-grupo.model';

@Injectable({ providedIn: 'root'})
export class MiembrosGrupoService {
    private resourceUrl = ApiService.API_URL + '/miembros-grupos';

    constructor(protected http: HttpClient) { }

    create(miembrosGrupo: MiembrosGrupo): Observable<HttpResponse<MiembrosGrupo>> {
        return this.http.post<MiembrosGrupo>(this.resourceUrl, miembrosGrupo, { observe: 'response'});
    }

    update(miembrosGrupo: MiembrosGrupo): Observable<HttpResponse<MiembrosGrupo>> {
        return this.http.put(this.resourceUrl, miembrosGrupo, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MiembrosGrupo>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MiembrosGrupo[]>> {
        const options = createRequestOption(req);
        return this.http.get<MiembrosGrupo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
