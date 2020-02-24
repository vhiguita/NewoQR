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

import { EntradaMiembrosPage } from './entrada-miembros';
import { EntradaMiembrosUpdatePage } from './entrada-miembros-update';
import { EntradaMiembros, EntradaMiembrosService, EntradaMiembrosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class EntradaMiembrosResolve implements Resolve<EntradaMiembros> {
  constructor(private service: EntradaMiembrosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EntradaMiembros> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EntradaMiembros>) => response.ok),
        map((entradaMiembros: HttpResponse<EntradaMiembros>) => entradaMiembros.body)
      );
    }
    return of(new EntradaMiembros());
  }
}

const routes: Routes = [
    {
      path: '',
      component: EntradaMiembrosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: EntradaMiembrosUpdatePage,
      resolve: {
        data: EntradaMiembrosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: EntradaMiembrosDetailPage,
      resolve: {
        data: EntradaMiembrosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: EntradaMiembrosUpdatePage,
      resolve: {
        data: EntradaMiembrosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        EntradaMiembrosPage,
        EntradaMiembrosUpdatePage,
        EntradaMiembrosDetailPage
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
export class EntradaMiembrosPageModule {
}
