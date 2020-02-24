import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { ProductosServiciosPage } from './productos-servicios';
import { ProductosServiciosUpdatePage } from './productos-servicios-update';
import { ProductosServicios, ProductosServiciosService, ProductosServiciosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ProductosServiciosResolve implements Resolve<ProductosServicios> {
  constructor(private service: ProductosServiciosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductosServicios> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductosServicios>) => response.ok),
        map((productosServicios: HttpResponse<ProductosServicios>) => productosServicios.body)
      );
    }
    return of(new ProductosServicios());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ProductosServiciosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ProductosServiciosUpdatePage,
      resolve: {
        data: ProductosServiciosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ProductosServiciosDetailPage,
      resolve: {
        data: ProductosServiciosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ProductosServiciosUpdatePage,
      resolve: {
        data: ProductosServiciosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ProductosServiciosPage,
        ProductosServiciosUpdatePage,
        ProductosServiciosDetailPage
    ],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ],
    providers: [Camera]
})
export class ProductosServiciosPageModule {
}
