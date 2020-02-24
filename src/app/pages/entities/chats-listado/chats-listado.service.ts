import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ChatsListado } from './chats-listado.model';

@Injectable({ providedIn: 'root'})
export class ChatsListadoService {
    private resourceUrl = ApiService.API_URL + '/chats-listados';

    constructor(protected http: HttpClient) { }

    create(chatsListado: ChatsListado): Observable<HttpResponse<ChatsListado>> {
        return this.http.post<ChatsListado>(this.resourceUrl, chatsListado, { observe: 'response'});
    }

    update(chatsListado: ChatsListado): Observable<HttpResponse<ChatsListado>> {
        return this.http.put(this.resourceUrl, chatsListado, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ChatsListado>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<ChatsListado[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatsListado[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
