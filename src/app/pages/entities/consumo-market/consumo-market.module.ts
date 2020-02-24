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

import { ConsumoMarketPage } from './consumo-market';
import { ConsumoMarketUpdatePage } from './consumo-market-update';
import { ConsumoMarket, ConsumoMarketService, ConsumoMarketDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ConsumoMarketResolve implements Resolve<ConsumoMarket> {
  constructor(private service: ConsumoMarketService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ConsumoMarket> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ConsumoMarket>) => response.ok),
        map((consumoMarket: HttpResponse<ConsumoMarket>) => consumoMarket.body)
      );
    }
    return of(new ConsumoMarket());
  }
}

const routes: Routes = [
    {
      path: '',
      component: ConsumoMarketPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: ConsumoMarketUpdatePage,
      resolve: {
        data: ConsumoMarketResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: ConsumoMarketDetailPage,
      resolve: {
        data: ConsumoMarketResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: ConsumoMarketUpdatePage,
      resolve: {
        data: ConsumoMarketResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        ConsumoMarketPage,
        ConsumoMarketUpdatePage,
        ConsumoMarketDetailPage
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
export class ConsumoMarketPageModule {
}
