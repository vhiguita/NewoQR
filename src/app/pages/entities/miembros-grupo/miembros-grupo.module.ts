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

import { MiembrosGrupoPage } from './miembros-grupo';
import { MiembrosGrupoUpdatePage } from './miembros-grupo-update';
import { MiembrosGrupo, MiembrosGrupoService, MiembrosGrupoDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MiembrosGrupoResolve implements Resolve<MiembrosGrupo> {
  constructor(private service: MiembrosGrupoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MiembrosGrupo> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MiembrosGrupo>) => response.ok),
        map((miembrosGrupo: HttpResponse<MiembrosGrupo>) => miembrosGrupo.body)
      );
    }
    return of(new MiembrosGrupo());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MiembrosGrupoPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MiembrosGrupoUpdatePage,
      resolve: {
        data: MiembrosGrupoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MiembrosGrupoDetailPage,
      resolve: {
        data: MiembrosGrupoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MiembrosGrupoUpdatePage,
      resolve: {
        data: MiembrosGrupoResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MiembrosGrupoPage,
        MiembrosGrupoUpdatePage,
        MiembrosGrupoDetailPage
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
export class MiembrosGrupoPageModule {
}
