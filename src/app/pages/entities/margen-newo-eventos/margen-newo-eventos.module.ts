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

import { MargenNewoEventosPage } from './margen-newo-eventos';
import { MargenNewoEventosUpdatePage } from './margen-newo-eventos-update';
import { MargenNewoEventos, MargenNewoEventosService, MargenNewoEventosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MargenNewoEventosResolve implements Resolve<MargenNewoEventos> {
  constructor(private service: MargenNewoEventosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MargenNewoEventos> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MargenNewoEventos>) => response.ok),
        map((margenNewoEventos: HttpResponse<MargenNewoEventos>) => margenNewoEventos.body)
      );
    }
    return of(new MargenNewoEventos());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MargenNewoEventosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MargenNewoEventosUpdatePage,
      resolve: {
        data: MargenNewoEventosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MargenNewoEventosDetailPage,
      resolve: {
        data: MargenNewoEventosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MargenNewoEventosUpdatePage,
      resolve: {
        data: MargenNewoEventosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MargenNewoEventosPage,
        MargenNewoEventosUpdatePage,
        MargenNewoEventosDetailPage
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
export class MargenNewoEventosPageModule {
}
