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

import { PrepagoConsumoPage } from './prepago-consumo';
import { PrepagoConsumoUpdatePage } from './prepago-consumo-update';
import { PrepagoConsumo, PrepagoConsumoService, PrepagoConsumoDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class PrepagoConsumoResolve implements Resolve<PrepagoConsumo> {
  constructor(private service: PrepagoConsumoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PrepagoConsumo> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PrepagoConsumo>) => response.ok),
        map((prepagoConsumo: HttpResponse<PrepagoConsumo>) => prepagoConsumo.body)
      );
    }
    return of(new PrepagoConsumo());
  }
}

const routes: Routes = [
    {
      path: '',
      component: PrepagoConsumoPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: PrepagoConsumoUpdatePage,
      resolve: {
        data: PrepagoConsumoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: PrepagoConsumoDetailPage,
      resolve: {
        data: PrepagoConsumoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: PrepagoConsumoUpdatePage,
      resolve: {
        data: PrepagoConsumoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        PrepagoConsumoPage,
        PrepagoConsumoUpdatePage,
        PrepagoConsumoDetailPage
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
export class PrepagoConsumoPageModule {
}
