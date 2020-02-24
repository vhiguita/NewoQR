import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { EquipoEmpresas } from './equipo-empresas.model';

@Injectable({ providedIn: 'root'})
export class EquipoEmpresasService {
    private resourceUrl = ApiService.API_URL + '/equipo-empresas';

    constructor(protected http: HttpClient) { }

    create(equipoEmpresas: EquipoEmpresas): Observable<HttpResponse<EquipoEmpresas>> {
        return this.http.post<EquipoEmpresas>(this.resourceUrl, equipoEmpresas, { observe: 'response'});
    }

    update(equipoEmpresas: EquipoEmpresas): Observable<HttpResponse<EquipoEmpresas>> {
        return this.http.put(this.resourceUrl, equipoEmpresas, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<EquipoEmpresas>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<EquipoEmpresas[]>> {
        const options = createRequestOption(req);
        return this.http.get<EquipoEmpresas[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
