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

import { EquipoEmpresasPage } from './equipo-empresas';
import { EquipoEmpresasUpdatePage } from './equipo-empresas-update';
import { EquipoEmpresas, EquipoEmpresasService, EquipoEmpresasDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class EquipoEmpresasResolve implements Resolve<EquipoEmpresas> {
  constructor(private service: EquipoEmpresasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EquipoEmpresas> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EquipoEmpresas>) => response.ok),
        map((equipoEmpresas: HttpResponse<EquipoEmpresas>) => equipoEmpresas.body)
      );
    }
    return of(new EquipoEmpresas());
  }
}

const routes: Routes = [
    {
      path: '',
      component: EquipoEmpresasPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: EquipoEmpresasUpdatePage,
      resolve: {
        data: EquipoEmpresasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: EquipoEmpresasDetailPage,
      resolve: {
        data: EquipoEmpresasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: EquipoEmpresasUpdatePage,
      resolve: {
        data: EquipoEmpresasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        EquipoEmpresasPage,
        EquipoEmpresasUpdatePage,
        EquipoEmpresasDetailPage
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
export class EquipoEmpresasPageModule {
}
