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

import { TipoRegistroCompraPage } from './tipo-registro-compra';
import { TipoRegistroCompraUpdatePage } from './tipo-registro-compra-update';
import { TipoRegistroCompra, TipoRegistroCompraService, TipoRegistroCompraDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class TipoRegistroCompraResolve implements Resolve<TipoRegistroCompra> {
  constructor(private service: TipoRegistroCompraService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoRegistroCompra> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoRegistroCompra>) => response.ok),
        map((tipoRegistroCompra: HttpResponse<TipoRegistroCompra>) => tipoRegistroCompra.body)
      );
    }
    return of(new TipoRegistroCompra());
  }
}

const routes: Routes = [
    {
      path: '',
      component: TipoRegistroCompraPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: TipoRegistroCompraUpdatePage,
      resolve: {
        data: TipoRegistroCompraResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: TipoRegistroCompraDetailPage,
      resolve: {
        data: TipoRegistroCompraResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: TipoRegistroCompraUpdatePage,
      resolve: {
        data: TipoRegistroCompraResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        TipoRegistroCompraPage,
        TipoRegistroCompraUpdatePage,
        TipoRegistroCompraDetailPage
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
export class TipoRegistroCompraPageModule {
}
