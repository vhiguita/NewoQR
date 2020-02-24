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

import { EmpresaPage } from './empresa';
import { EmpresaUpdatePage } from './empresa-update';
import { Empresa, EmpresaService, EmpresaDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class EmpresaResolve implements Resolve<Empresa> {
  constructor(private service: EmpresaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Empresa> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Empresa>) => response.ok),
        map((empresa: HttpResponse<Empresa>) => empresa.body)
      );
    }
    return of(new Empresa());
  }
}

const routes: Routes = [
    {
      path: '',
      component: EmpresaPage,
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: 'new',
      component: EmpresaUpdatePage,
      resolve: {
        data: EmpresaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/view',
      component: EmpresaDetailPage,
      resolve: {
        data: EmpresaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    },
    {
      path: ':id/edit',
      component: EmpresaUpdatePage,
      resolve: {
        data: EmpresaResolve
      },
      data: {
        authorities: ['ROLE_USER']
      },
      canActivate: [UserRouteAccessService]
    }
  ];


@NgModule({
    declarations: [
        EmpresaPage,
        EmpresaUpdatePage,
        EmpresaDetailPage
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
export class EmpresaPageModule {
}
