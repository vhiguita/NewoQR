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

import { EspaciosReservaPage } from './espacios-reserva';
import { EspaciosReservaUpdatePage } from './espacios-reserva-update';
import { EspaciosReserva, EspaciosReservaService, EspaciosReservaDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class EspaciosReservaResolve implements Resolve<EspaciosReserva> {
  constructor(private service: EspaciosReservaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EspaciosReserva> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EspaciosReserva>) => response.ok),
        map((espaciosReserva: HttpResponse<EspaciosReserva>) => espaciosReserva.body)
      );
    }
    return of(new EspaciosReserva());
  }
}

const routes: Routes = [
    {
      path: '',
      component: EspaciosReservaPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: EspaciosReservaUpdatePage,
      resolve: {
        data: EspaciosReservaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: EspaciosReservaDetailPage,
      resolve: {
        data: EspaciosReservaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: EspaciosReservaUpdatePage,
      resolve: {
        data: EspaciosReservaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        EspaciosReservaPage,
        EspaciosReservaUpdatePage,
        EspaciosReservaDetailPage
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
export class EspaciosReservaPageModule {
}
