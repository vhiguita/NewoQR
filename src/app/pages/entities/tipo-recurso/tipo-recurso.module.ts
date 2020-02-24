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

import { TipoRecursoPage } from './tipo-recurso';
import { TipoRecursoUpdatePage } from './tipo-recurso-update';
import { TipoRecurso, TipoRecursoService, TipoRecursoDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class TipoRecursoResolve implements Resolve<TipoRecurso> {
  constructor(private service: TipoRecursoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoRecurso> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoRecurso>) => response.ok),
        map((tipoRecurso: HttpResponse<TipoRecurso>) => tipoRecurso.body)
      );
    }
    return of(new TipoRecurso());
  }
}

const routes: Routes = [
    {
      path: '',
      component: TipoRecursoPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: TipoRecursoUpdatePage,
      resolve: {
        data: TipoRecursoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: TipoRecursoDetailPage,
      resolve: {
        data: TipoRecursoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: TipoRecursoUpdatePage,
      resolve: {
        data: TipoRecursoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        TipoRecursoPage,
        TipoRecursoUpdatePage,
        TipoRecursoDetailPage
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
export class TipoRecursoPageModule {
}
