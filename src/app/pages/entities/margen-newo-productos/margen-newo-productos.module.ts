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

import { MargenNewoProductosPage } from './margen-newo-productos';
import { MargenNewoProductosUpdatePage } from './margen-newo-productos-update';
import { MargenNewoProductos, MargenNewoProductosService, MargenNewoProductosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MargenNewoProductosResolve implements Resolve<MargenNewoProductos> {
  constructor(private service: MargenNewoProductosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MargenNewoProductos> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MargenNewoProductos>) => response.ok),
        map((margenNewoProductos: HttpResponse<MargenNewoProductos>) => margenNewoProductos.body)
      );
    }
    return of(new MargenNewoProductos());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MargenNewoProductosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MargenNewoProductosUpdatePage,
      resolve: {
        data: MargenNewoProductosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MargenNewoProductosDetailPage,
      resolve: {
        data: MargenNewoProductosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MargenNewoProductosUpdatePage,
      resolve: {
        data: MargenNewoProductosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MargenNewoProductosPage,
        MargenNewoProductosUpdatePage,
        MargenNewoProductosDetailPage
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
export class MargenNewoProductosPageModule {
}
