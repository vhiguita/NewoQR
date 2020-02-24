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

import { UsoRecursoFisicoPage } from './uso-recurso-fisico';
import { UsoRecursoFisicoUpdatePage } from './uso-recurso-fisico-update';
import { UsoRecursoFisico, UsoRecursoFisicoService, UsoRecursoFisicoDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class UsoRecursoFisicoResolve implements Resolve<UsoRecursoFisico> {
  constructor(private service: UsoRecursoFisicoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UsoRecursoFisico> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UsoRecursoFisico>) => response.ok),
        map((usoRecursoFisico: HttpResponse<UsoRecursoFisico>) => usoRecursoFisico.body)
      );
    }
    return of(new UsoRecursoFisico());
  }
}

const routes: Routes = [
    {
      path: '',
      component: UsoRecursoFisicoPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: UsoRecursoFisicoUpdatePage,
      resolve: {
        data: UsoRecursoFisicoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: UsoRecursoFisicoDetailPage,
      resolve: {
        data: UsoRecursoFisicoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: UsoRecursoFisicoUpdatePage,
      resolve: {
        data: UsoRecursoFisicoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        UsoRecursoFisicoPage,
        UsoRecursoFisicoUpdatePage,
        UsoRecursoFisicoDetailPage
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
export class UsoRecursoFisicoPageModule {
}
