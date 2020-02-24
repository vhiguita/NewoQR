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

import { EntradaInvitadosPage } from './entrada-invitados';
import { EntradaInvitadosUpdatePage } from './entrada-invitados-update';
import { EntradaInvitados, EntradaInvitadosService, EntradaInvitadosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class EntradaInvitadosResolve implements Resolve<EntradaInvitados> {
  constructor(private service: EntradaInvitadosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EntradaInvitados> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EntradaInvitados>) => response.ok),
        map((entradaInvitados: HttpResponse<EntradaInvitados>) => entradaInvitados.body)
      );
    }
    return of(new EntradaInvitados());
  }
}

const routes: Routes = [
    {
      path: '',
      component: EntradaInvitadosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: EntradaInvitadosUpdatePage,
      resolve: {
        data: EntradaInvitadosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: EntradaInvitadosDetailPage,
      resolve: {
        data: EntradaInvitadosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: EntradaInvitadosUpdatePage,
      resolve: {
        data: EntradaInvitadosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        EntradaInvitadosPage,
        EntradaInvitadosUpdatePage,
        EntradaInvitadosDetailPage
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
export class EntradaInvitadosPageModule {
}
