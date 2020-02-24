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

import { ChatsListadoPage } from './chats-listado';
import { ChatsListadoUpdatePage } from './chats-listado-update';
import { ChatsListado, ChatsListadoService, ChatsListadoDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ChatsListadoResolve implements Resolve<ChatsListado> {
  constructor(private service: ChatsListadoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ChatsListado> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ChatsListado>) => response.ok),
        map((chatsListado: HttpResponse<ChatsListado>) => chatsListado.body)
      );
    }
    return of(new ChatsListado());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ChatsListadoPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ChatsListadoUpdatePage,
      resolve: {
        data: ChatsListadoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ChatsListadoDetailPage,
      resolve: {
        data: ChatsListadoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ChatsListadoUpdatePage,
      resolve: {
        data: ChatsListadoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ChatsListadoPage,
        ChatsListadoUpdatePage,
        ChatsListadoDetailPage
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
export class ChatsListadoPageModule {
}
