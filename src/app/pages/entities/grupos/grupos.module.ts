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

import { GruposPage } from './grupos';
import { GruposUpdatePage } from './grupos-update';
import { Grupos, GruposService, GruposDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class GruposResolve implements Resolve<Grupos> {
  constructor(private service: GruposService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Grupos> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Grupos>) => response.ok),
        map((grupos: HttpResponse<Grupos>) => grupos.body)
      );
    }
    return of(new Grupos());
  }
}

const routes: Routes = [
    {
      path: '',
      component: GruposPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: GruposUpdatePage,
      resolve: {
        data: GruposResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: GruposDetailPage,
      resolve: {
        data: GruposResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: GruposUpdatePage,
      resolve: {
        data: GruposResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        GruposPage,
        GruposUpdatePage,
        GruposDetailPage
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
export class GruposPageModule {
}
