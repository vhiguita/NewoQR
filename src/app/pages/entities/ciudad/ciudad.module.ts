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

import { CiudadPage } from './ciudad';
import { CiudadUpdatePage } from './ciudad-update';
import { Ciudad, CiudadService, CiudadDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class CiudadResolve implements Resolve<Ciudad> {
  constructor(private service: CiudadService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ciudad> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ciudad>) => response.ok),
        map((ciudad: HttpResponse<Ciudad>) => ciudad.body)
      );
    }
    return of(new Ciudad());
  }
}

const routes: Routes = [
    {
      path: '',
      component: CiudadPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: CiudadUpdatePage,
      resolve: {
        data: CiudadResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: CiudadDetailPage,
      resolve: {
        data: CiudadResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: CiudadUpdatePage,
      resolve: {
        data: CiudadResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        CiudadPage,
        CiudadUpdatePage,
        CiudadDetailPage
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
export class CiudadPageModule {
}
