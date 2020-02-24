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

import { ComentarioVideoBlogPage } from './comentario-video-blog';
import { ComentarioVideoBlogUpdatePage } from './comentario-video-blog-update';
import { ComentarioVideoBlog, ComentarioVideoBlogService, ComentarioVideoBlogDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ComentarioVideoBlogResolve implements Resolve<ComentarioVideoBlog> {
  constructor(private service: ComentarioVideoBlogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComentarioVideoBlog> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ComentarioVideoBlog>) => response.ok),
        map((comentarioVideoBlog: HttpResponse<ComentarioVideoBlog>) => comentarioVideoBlog.body)
      );
    }
    return of(new ComentarioVideoBlog());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ComentarioVideoBlogPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ComentarioVideoBlogUpdatePage,
      resolve: {
        data: ComentarioVideoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ComentarioVideoBlogDetailPage,
      resolve: {
        data: ComentarioVideoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ComentarioVideoBlogUpdatePage,
      resolve: {
        data: ComentarioVideoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ComentarioVideoBlogPage,
        ComentarioVideoBlogUpdatePage,
        ComentarioVideoBlogDetailPage
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
export class ComentarioVideoBlogPageModule {
}
