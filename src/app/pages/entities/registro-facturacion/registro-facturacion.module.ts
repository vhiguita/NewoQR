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

import { RegistroFacturacionPage } from './registro-facturacion';
import { RegistroFacturacionUpdatePage } from './registro-facturacion-update';
import { RegistroFacturacion, RegistroFacturacionService, RegistroFacturacionDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class RegistroFacturacionResolve implements Resolve<RegistroFacturacion> {
  constructor(private service: RegistroFacturacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RegistroFacturacion> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RegistroFacturacion>) => response.ok),
        map((registroFacturacion: HttpResponse<RegistroFacturacion>) => registroFacturacion.body)
      );
    }
    return of(new RegistroFacturacion());
  }
}

const routes: Routes = [
    {
      path: '',
      component: RegistroFacturacionPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: RegistroFacturacionUpdatePage,
      resolve: {
        data: RegistroFacturacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: RegistroFacturacionDetailPage,
      resolve: {
        data: RegistroFacturacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: RegistroFacturacionUpdatePage,
      resolve: {
        data: RegistroFacturacionResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        RegistroFacturacionPage,
        RegistroFacturacionUpdatePage,
        RegistroFacturacionDetailPage
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
export class RegistroFacturacionPageModule {
}
