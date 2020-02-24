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

import { BeneficioPage } from './beneficio';
import { BeneficioUpdatePage } from './beneficio-update';
import { Beneficio, BeneficioService, BeneficioDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class BeneficioResolve implements Resolve<Beneficio> {
  constructor(private service: BeneficioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Beneficio> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Beneficio>) => response.ok),
        map((beneficio: HttpResponse<Beneficio>) => beneficio.body)
      );
    }
    return of(new Beneficio());
  }
}

const routes: Routes = [
    {
      path: '',
      component: BeneficioPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: BeneficioUpdatePage,
      resolve: {
        data: BeneficioResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: BeneficioDetailPage,
      resolve: {
        data: BeneficioResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: BeneficioUpdatePage,
      resolve: {
        data: BeneficioResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        BeneficioPage,
        BeneficioUpdatePage,
        BeneficioDetailPage
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
export class BeneficioPageModule {
}
