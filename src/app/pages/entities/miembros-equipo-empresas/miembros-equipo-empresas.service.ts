import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MiembrosEquipoEmpresas } from './miembros-equipo-empresas.model';

@Injectable({ providedIn: 'root'})
export class MiembrosEquipoEmpresasService {
    private resourceUrl = ApiService.API_URL + '/miembros-equipo-empresas';

    constructor(protected http: HttpClient) { }

    create(miembrosEquipoEmpresas: MiembrosEquipoEmpresas): Observable<HttpResponse<MiembrosEquipoEmpresas>> {
        return this.http.post<MiembrosEquipoEmpresas>(this.resourceUrl, miembrosEquipoEmpresas, { observe: 'response'});
    }

    update(miembrosEquipoEmpresas: MiembrosEquipoEmpresas): Observable<HttpResponse<MiembrosEquipoEmpresas>> {
        return this.http.put(this.resourceUrl, miembrosEquipoEmpresas, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MiembrosEquipoEmpresas>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MiembrosEquipoEmpresas[]>> {
        const options = createRequestOption(req);
        return this.http.get<MiembrosEquipoEmpresas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
