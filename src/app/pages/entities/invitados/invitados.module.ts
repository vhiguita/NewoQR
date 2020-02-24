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

import { InvitadosPage } from './invitados';
import { InvitadosUpdatePage } from './invitados-update';
import { Invitados, InvitadosService, InvitadosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class InvitadosResolve implements Resolve<Invitados> {
  constructor(private service: InvitadosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invitados> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Invitados>) => response.ok),
        map((invitados: HttpResponse<Invitados>) => invitados.body)
      );
    }
    return of(new Invitados());
  }
}

const routes: Routes = [
    {
      path: '',
      component: InvitadosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: InvitadosUpdatePage,
      resolve: {
        data: InvitadosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: InvitadosDetailPage,
      resolve: {
        data: InvitadosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: InvitadosUpdatePage,
      resolve: {
        data: InvitadosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        InvitadosPage,
        InvitadosUpdatePage,
        InvitadosDetailPage
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
export class InvitadosPageModule {
}
