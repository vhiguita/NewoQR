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

import { InvitacionPage } from './invitacion';
import { InvitacionUpdatePage } from './invitacion-update';
import { Invitacion, InvitacionService, InvitacionDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class InvitacionResolve implements Resolve<Invitacion> {
  constructor(private service: InvitacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invitacion> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Invitacion>) => response.ok),
        map((invitacion: HttpResponse<Invitacion>) => invitacion.body)
      );
    }
    return of(new Invitacion());
  }
}

const routes: Routes = [
    {
      path: '',
      component: InvitacionPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: InvitacionUpdatePage,
      resolve: {
        data: InvitacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: InvitacionDetailPage,
      resolve: {
        data: InvitacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: InvitacionUpdatePage,
      resolve: {
        data: InvitacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        InvitacionPage,
        InvitacionUpdatePage,
        InvitacionDetailPage
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
export class InvitacionPageModule {
}
