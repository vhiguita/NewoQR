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

import { CuentaAsociadaPage } from './cuenta-asociada';
import { CuentaAsociadaUpdatePage } from './cuenta-asociada-update';
import { CuentaAsociada, CuentaAsociadaService, CuentaAsociadaDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class CuentaAsociadaResolve implements Resolve<CuentaAsociada> {
  constructor(private service: CuentaAsociadaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CuentaAsociada> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CuentaAsociada>) => response.ok),
        map((cuentaAsociada: HttpResponse<CuentaAsociada>) => cuentaAsociada.body)
      );
    }
    return of(new CuentaAsociada());
  }
}

const routes: Routes = [
    {
      path: '',
      component: CuentaAsociadaPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: CuentaAsociadaUpdatePage,
      resolve: {
        data: CuentaAsociadaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: CuentaAsociadaDetailPage,
      resolve: {
        data: CuentaAsociadaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: CuentaAsociadaUpdatePage,
      resolve: {
        data: CuentaAsociadaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        CuentaAsociadaPage,
        CuentaAsociadaUpdatePage,
        CuentaAsociadaDetailPage
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
export class CuentaAsociadaPageModule {
}
