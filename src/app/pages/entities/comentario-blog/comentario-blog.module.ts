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

import { ComentarioBlogPage } from './comentario-blog';
import { ComentarioBlogUpdatePage } from './comentario-blog-update';
import { ComentarioBlog, ComentarioBlogService, ComentarioBlogDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ComentarioBlogResolve implements Resolve<ComentarioBlog> {
  constructor(private service: ComentarioBlogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComentarioBlog> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ComentarioBlog>) => response.ok),
        map((comentarioBlog: HttpResponse<ComentarioBlog>) => comentarioBlog.body)
      );
    }
    return of(new ComentarioBlog());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ComentarioBlogPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ComentarioBlogUpdatePage,
      resolve: {
        data: ComentarioBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ComentarioBlogDetailPage,
      resolve: {
        data: ComentarioBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ComentarioBlogUpdatePage,
      resolve: {
        data: ComentarioBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ComentarioBlogPage,
        ComentarioBlogUpdatePage,
        ComentarioBlogDetailPage
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
export class ComentarioBlogPageModule {
}
