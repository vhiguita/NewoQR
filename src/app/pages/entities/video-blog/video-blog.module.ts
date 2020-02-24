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

import { VideoBlogPage } from './video-blog';
import { VideoBlogUpdatePage } from './video-blog-update';
import { VideoBlog, VideoBlogService, VideoBlogDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class VideoBlogResolve implements Resolve<VideoBlog> {
  constructor(private service: VideoBlogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VideoBlog> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<VideoBlog>) => response.ok),
        map((videoBlog: HttpResponse<VideoBlog>) => videoBlog.body)
      );
    }
    return of(new VideoBlog());
  }
}

const routes: Routes = [
    {
      path: '',
      component: VideoBlogPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: VideoBlogUpdatePage,
      resolve: {
        data: VideoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: VideoBlogDetailPage,
      resolve: {
        data: VideoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: VideoBlogUpdatePage,
      resolve: {
        data: VideoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        VideoBlogPage,
        VideoBlogUpdatePage,
        VideoBlogDetailPage
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
export class VideoBlogPageModule {
}
