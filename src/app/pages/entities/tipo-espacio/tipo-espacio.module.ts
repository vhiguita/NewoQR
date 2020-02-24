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

import { TipoEspacioPage } from './tipo-espacio';
import { TipoEspacioUpdatePage } from './tipo-espacio-update';
import { TipoEspacio, TipoEspacioService, TipoEspacioDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class TipoEspacioResolve implements Resolve<TipoEspacio> {
  constructor(private service: TipoEspacioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoEspacio> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoEspacio>) => response.ok),
        map((tipoEspacio: HttpResponse<TipoEspacio>) => tipoEspacio.body)
      );
    }
    return of(new TipoEspacio());
  }
}

const routes: Routes = [
    {
      path: '',
      component: TipoEspacioPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: TipoEspacioUpdatePage,
      resolve: {
        data: TipoEspacioResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: TipoEspacioDetailPage,
      resolve: {
        data: TipoEspacioResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: TipoEspacioUpdatePage,
      resolve: {
        data: TipoEspacioResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        TipoEspacioPage,
        TipoEspacioUpdatePage,
        TipoEspacioDetailPage
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
export class TipoEspacioPageModule {
}
