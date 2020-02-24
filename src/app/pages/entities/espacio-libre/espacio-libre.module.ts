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

import { EspacioLibrePage } from './espacio-libre';
import { EspacioLibreUpdatePage } from './espacio-libre-update';
import { EspacioLibre, EspacioLibreService, EspacioLibreDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class EspacioLibreResolve implements Resolve<EspacioLibre> {
  constructor(private service: EspacioLibreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EspacioLibre> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EspacioLibre>) => response.ok),
        map((espacioLibre: HttpResponse<EspacioLibre>) => espacioLibre.body)
      );
    }
    return of(new EspacioLibre());
  }
}

const routes: Routes = [
    {
      path: '',
      component: EspacioLibrePage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: EspacioLibreUpdatePage,
      resolve: {
        data: EspacioLibreResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: EspacioLibreDetailPage,
      resolve: {
        data: EspacioLibreResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: EspacioLibreUpdatePage,
      resolve: {
        data: EspacioLibreResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        EspacioLibrePage,
        EspacioLibreUpdatePage,
        EspacioLibreDetailPage
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
export class EspacioLibrePageModule {
}
