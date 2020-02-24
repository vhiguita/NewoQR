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

import { MiembrosPage } from './miembros';
import { MiembrosUpdatePage } from './miembros-update';
import { Miembros, MiembrosService, MiembrosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MiembrosResolve implements Resolve<Miembros> {
  constructor(private service: MiembrosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Miembros> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Miembros>) => response.ok),
        map((miembros: HttpResponse<Miembros>) => miembros.body)
      );
    }
    return of(new Miembros());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MiembrosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MiembrosUpdatePage,
      resolve: {
        data: MiembrosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MiembrosDetailPage,
      resolve: {
        data: MiembrosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MiembrosUpdatePage,
      resolve: {
        data: MiembrosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MiembrosPage,
        MiembrosUpdatePage,
        MiembrosDetailPage
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
export class MiembrosPageModule {
}
