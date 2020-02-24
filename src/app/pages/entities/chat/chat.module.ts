import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { ChatPage } from './chat';
import { ChatUpdatePage } from './chat-update';
import { Chat, ChatService, ChatDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ChatResolve implements Resolve<Chat> {
  constructor(private service: ChatService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chat> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Chat>) => response.ok),
        map((chat: HttpResponse<Chat>) => chat.body)
      );
    }
    return of(new Chat());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ChatPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ChatUpdatePage,
      resolve: {
        data: ChatResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ChatDetailPage,
      resolve: {
        data: ChatResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ChatUpdatePage,
      resolve: {
        data: ChatResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ChatPage,
        ChatUpdatePage,
        ChatDetailPage
    ],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ]
})
export class ChatPageModule {
}
