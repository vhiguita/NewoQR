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

import { MiembrosEquipoEmpresasPage } from './miembros-equipo-empresas';
import { MiembrosEquipoEmpresasUpdatePage } from './miembros-equipo-empresas-update';
import { MiembrosEquipoEmpresas, MiembrosEquipoEmpresasService, MiembrosEquipoEmpresasDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MiembrosEquipoEmpresasResolve implements Resolve<MiembrosEquipoEmpresas> {
  constructor(private service: MiembrosEquipoEmpresasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MiembrosEquipoEmpresas> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MiembrosEquipoEmpresas>) => response.ok),
        map((miembrosEquipoEmpresas: HttpResponse<MiembrosEquipoEmpresas>) => miembrosEquipoEmpresas.body)
      );
    }
    return of(new MiembrosEquipoEmpresas());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MiembrosEquipoEmpresasPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MiembrosEquipoEmpresasUpdatePage,
      resolve: {
        data: MiembrosEquipoEmpresasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MiembrosEquipoEmpresasDetailPage,
      resolve: {
        data: MiembrosEquipoEmpresasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MiembrosEquipoEmpresasUpdatePage,
      resolve: {
        data: MiembrosEquipoEmpresasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MiembrosEquipoEmpresasPage,
        MiembrosEquipoEmpresasUpdatePage,
        MiembrosEquipoEmpresasDetailPage
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
export class MiembrosEquipoEmpresasPageModule {
}
