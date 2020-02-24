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

import { FacturacionPage } from './facturacion';
import { FacturacionUpdatePage } from './facturacion-update';
import { Facturacion, FacturacionService, FacturacionDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class FacturacionResolve implements Resolve<Facturacion> {
  constructor(private service: FacturacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Facturacion> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Facturacion>) => response.ok),
        map((facturacion: HttpResponse<Facturacion>) => facturacion.body)
      );
    }
    return of(new Facturacion());
  }
}

const routes: Routes = [
    {
      path: '',
      component: FacturacionPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: FacturacionUpdatePage,
      resolve: {
        data: FacturacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: FacturacionDetailPage,
      resolve: {
        data: FacturacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: FacturacionUpdatePage,
      resolve: {
        data: FacturacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        FacturacionPage,
        FacturacionUpdatePage,
        FacturacionDetailPage
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
export class FacturacionPageModule {
}
