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

import { TipoPrepagoConsumoPage } from './tipo-prepago-consumo';
import { TipoPrepagoConsumoUpdatePage } from './tipo-prepago-consumo-update';
import { TipoPrepagoConsumo, TipoPrepagoConsumoService, TipoPrepagoConsumoDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class TipoPrepagoConsumoResolve implements Resolve<TipoPrepagoConsumo> {
  constructor(private service: TipoPrepagoConsumoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoPrepagoConsumo> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoPrepagoConsumo>) => response.ok),
        map((tipoPrepagoConsumo: HttpResponse<TipoPrepagoConsumo>) => tipoPrepagoConsumo.body)
      );
    }
    return of(new TipoPrepagoConsumo());
  }
}

const routes: Routes = [
    {
      path: '',
      component: TipoPrepagoConsumoPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: TipoPrepagoConsumoUpdatePage,
      resolve: {
        data: TipoPrepagoConsumoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: TipoPrepagoConsumoDetailPage,
      resolve: {
        data: TipoPrepagoConsumoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: TipoPrepagoConsumoUpdatePage,
      resolve: {
        data: TipoPrepagoConsumoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        TipoPrepagoConsumoPage,
        TipoPrepagoConsumoUpdatePage,
        TipoPrepagoConsumoDetailPage
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
export class TipoPrepagoConsumoPageModule {
}
