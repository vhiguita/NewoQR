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

import { MargenNewoBlogPage } from './margen-newo-blog';
import { MargenNewoBlogUpdatePage } from './margen-newo-blog-update';
import { MargenNewoBlog, MargenNewoBlogService, MargenNewoBlogDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class MargenNewoBlogResolve implements Resolve<MargenNewoBlog> {
  constructor(private service: MargenNewoBlogService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MargenNewoBlog> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MargenNewoBlog>) => response.ok),
        map((margenNewoBlog: HttpResponse<MargenNewoBlog>) => margenNewoBlog.body)
      );
    }
    return of(new MargenNewoBlog());
  }
}

const routes: Routes = [
    {
      path: '',
      component: MargenNewoBlogPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: MargenNewoBlogUpdatePage,
      resolve: {
        data: MargenNewoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: MargenNewoBlogDetailPage,
      resolve: {
        data: MargenNewoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: MargenNewoBlogUpdatePage,
      resolve: {
        data: MargenNewoBlogResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        MargenNewoBlogPage,
        MargenNewoBlogUpdatePage,
        MargenNewoBlogDetailPage
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
export class MargenNewoBlogPageModule {
}
