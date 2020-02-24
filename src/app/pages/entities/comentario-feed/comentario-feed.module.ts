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

import { ComentarioFeedPage } from './comentario-feed';
import { ComentarioFeedUpdatePage } from './comentario-feed-update';
import { ComentarioFeed, ComentarioFeedService, ComentarioFeedDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ComentarioFeedResolve implements Resolve<ComentarioFeed> {
  constructor(private service: ComentarioFeedService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComentarioFeed> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ComentarioFeed>) => response.ok),
        map((comentarioFeed: HttpResponse<ComentarioFeed>) => comentarioFeed.body)
      );
    }
    return of(new ComentarioFeed());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ComentarioFeedPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ComentarioFeedUpdatePage,
      resolve: {
        data: ComentarioFeedResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ComentarioFeedDetailPage,
      resolve: {
        data: ComentarioFeedResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ComentarioFeedUpdatePage,
      resolve: {
        data: ComentarioFeedResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ComentarioFeedPage,
        ComentarioFeedUpdatePage,
        ComentarioFeedDetailPage
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
export class ComentarioFeedPageModule {
}
