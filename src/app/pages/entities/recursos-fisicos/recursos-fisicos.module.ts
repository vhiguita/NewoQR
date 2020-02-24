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

import { RecursosFisicosPage } from './recursos-fisicos';
import { RecursosFisicosUpdatePage } from './recursos-fisicos-update';
import { RecursosFisicos, RecursosFisicosService, RecursosFisicosDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class RecursosFisicosResolve implements Resolve<RecursosFisicos> {
  constructor(private service: RecursosFisicosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecursosFisicos> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecursosFisicos>) => response.ok),
        map((recursosFisicos: HttpResponse<RecursosFisicos>) => recursosFisicos.body)
      );
    }
    return of(new RecursosFisicos());
  }
}

const routes: Routes = [
    {
      path: '',
      component: RecursosFisicosPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: RecursosFisicosUpdatePage,
      resolve: {
        data: RecursosFisicosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: RecursosFisicosDetailPage,
      resolve: {
        data: RecursosFisicosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: RecursosFisicosUpdatePage,
      resolve: {
        data: RecursosFisicosResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        RecursosFisicosPage,
        RecursosFisicosUpdatePage,
        RecursosFisicosDetailPage
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
export class RecursosFisicosPageModule {
}
