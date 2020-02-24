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

import { HostSedePage } from './host-sede';
import { HostSedeUpdatePage } from './host-sede-update';
import { HostSede, HostSedeService, HostSedeDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class HostSedeResolve implements Resolve<HostSede> {
  constructor(private service: HostSedeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HostSede> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HostSede>) => response.ok),
        map((hostSede: HttpResponse<HostSede>) => hostSede.body)
      );
    }
    return of(new HostSede());
  }
}

const routes: Routes = [
    {
      path: '',
      component: HostSedePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: HostSedeUpdatePage,
      resolve: {
        data: HostSedeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: HostSedeDetailPage,
      resolve: {
        data: HostSedeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: HostSedeUpdatePage,
      resolve: {
        data: HostSedeResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        HostSedePage,
        HostSedeUpdatePage,
        HostSedeDetailPage
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
export class HostSedePageModule {
}
