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

import { CategoriaContenidosPage } from './categoria-contenidos';
import { CategoriaContenidosUpdatePage } from './categoria-contenidos-update';
import { CategoriaContenidos, CategoriaContenidosService, CategoriaContenidosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class CategoriaContenidosResolve implements Resolve<CategoriaContenidos> {
  constructor(private service: CategoriaContenidosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CategoriaContenidos> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CategoriaContenidos>) => response.ok),
        map((categoriaContenidos: HttpResponse<CategoriaContenidos>) => categoriaContenidos.body)
      );
    }
    return of(new CategoriaContenidos());
  }
}

const routes: Routes = [
    {
      path: '',
      component: CategoriaContenidosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: CategoriaContenidosUpdatePage,
      resolve: {
        data: CategoriaContenidosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: CategoriaContenidosDetailPage,
      resolve: {
        data: CategoriaContenidosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: CategoriaContenidosUpdatePage,
      resolve: {
        data: CategoriaContenidosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        CategoriaContenidosPage,
        CategoriaContenidosUpdatePage,
        CategoriaContenidosDetailPage
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
export class CategoriaContenidosPageModule {
}
