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

import { ReservasPage } from './reservas';
import { ReservasUpdatePage } from './reservas-update';
import { Reservas, ReservasService, ReservasDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ReservasResolve implements Resolve<Reservas> {
  constructor(private service: ReservasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reservas> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Reservas>) => response.ok),
        map((reservas: HttpResponse<Reservas>) => reservas.body)
      );
    }
    return of(new Reservas());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ReservasPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ReservasUpdatePage,
      resolve: {
        data: ReservasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ReservasDetailPage,
      resolve: {
        data: ReservasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ReservasUpdatePage,
      resolve: {
        data: ReservasResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ReservasPage,
        ReservasUpdatePage,
        ReservasDetailPage
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
export class ReservasPageModule {
}
