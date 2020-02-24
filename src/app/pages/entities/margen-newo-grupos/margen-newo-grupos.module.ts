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

import { MargenNewoGruposPage } from './margen-newo-grupos';
import { MargenNewoGruposUpdatePage } from './margen-newo-grupos-update';
import { MargenNewoGrupos, MargenNewoGruposService, MargenNewoGruposDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MargenNewoGruposResolve implements Resolve<MargenNewoGrupos> {
  constructor(private service: MargenNewoGruposService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MargenNewoGrupos> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MargenNewoGrupos>) => response.ok),
        map((margenNewoGrupos: HttpResponse<MargenNewoGrupos>) => margenNewoGrupos.body)
      );
    }
    return of(new MargenNewoGrupos());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MargenNewoGruposPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MargenNewoGruposUpdatePage,
      resolve: {
        data: MargenNewoGruposResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MargenNewoGruposDetailPage,
      resolve: {
        data: MargenNewoGruposResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MargenNewoGruposUpdatePage,
      resolve: {
        data: MargenNewoGruposResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MargenNewoGruposPage,
        MargenNewoGruposUpdatePage,
        MargenNewoGruposDetailPage
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
export class MargenNewoGruposPageModule {
}
