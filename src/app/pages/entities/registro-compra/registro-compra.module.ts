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

import { RegistroCompraPage } from './registro-compra';
import { RegistroCompraUpdatePage } from './registro-compra-update';
import { RegistroCompra, RegistroCompraService, RegistroCompraDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class RegistroCompraResolve implements Resolve<RegistroCompra> {
  constructor(private service: RegistroCompraService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RegistroCompra> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RegistroCompra>) => response.ok),
        map((registroCompra: HttpResponse<RegistroCompra>) => registroCompra.body)
      );
    }
    return of(new RegistroCompra());
  }
}

const routes: Routes = [
    {
      path: '',
      component: RegistroCompraPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: RegistroCompraUpdatePage,
      resolve: {
        data: RegistroCompraResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: RegistroCompraDetailPage,
      resolve: {
        data: RegistroCompraResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: RegistroCompraUpdatePage,
      resolve: {
        data: RegistroCompraResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        RegistroCompraPage,
        RegistroCompraUpdatePage,
        RegistroCompraDetailPage
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
export class RegistroCompraPageModule {
}
