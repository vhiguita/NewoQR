import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Chat } from './chat.model';

@Injectable({ providedIn: 'root'})
export class ChatService {
    private resourceUrl = ApiService.API_URL + '/chats';

    constructor(protected http: HttpClient) { }

    create(chat: Chat): Observable<HttpResponse<Chat>> {
        return this.http.post<Chat>(this.resourceUrl, chat, { observe: 'response'});
    }

    update(chat: Chat): Observable<HttpResponse<Chat>> {
        return this.http.put(this.resourceUrl, chat, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<Chat>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Chat[]>> {
        const options = createRequestOption(req);
        return this.http.get<Chat[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
