import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';
import { EntitiesPage } from './entities.page';

const routes: Routes = [
  {
    path: '',
    component: EntitiesPage,
    data: {
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
  , {
    path: 'invitados',
    loadChildren: './invitados/invitados.module#InvitadosPageModule'
  }
  , {
    path: 'invitacion',
    loadChildren: './invitacion/invitacion.module#InvitacionPageModule'
  }
  , {
    path: 'miembros',
    loadChildren: './miembros/miembros.module#MiembrosPageModule'
  }
  , {
    path: 'entrada-miembros',
    loadChildren: './entrada-miembros/entrada-miembros.module#EntradaMiembrosPageModule'
  }
  , {
    path: 'entrada-invitados',
    loadChildren: './entrada-invitados/entrada-invitados.module#EntradaInvitadosPageModule'
  }
  , {
    path: 'sedes',
    loadChildren: './sedes/sedes.module#SedesPageModule'
  }
  , {
    path: 'espacio-libre',
    loadChildren: './espacio-libre/espacio-libre.module#EspacioLibrePageModule'
  }
  , {
    path: 'tipo-espacio',
    loadChildren: './tipo-espacio/tipo-espacio.module#TipoEspacioPageModule'
  }
  , {
    path: 'host-sede',
    loadChildren: './host-sede/host-sede.module#HostSedePageModule'
  }
  , {
    path: 'reservas',
    loadChildren: './reservas/reservas.module#ReservasPageModule'
  }
  , {
    path: 'espacios-reserva',
    loadChildren: './espacios-reserva/espacios-reserva.module#EspaciosReservaPageModule'
  }
  , {
    path: 'registro-compra',
    loadChildren: './registro-compra/registro-compra.module#RegistroCompraPageModule'
  }
  , {
    path: 'tipo-registro-compra',
    loadChildren: './tipo-registro-compra/tipo-registro-compra.module#TipoRegistroCompraPageModule'
  }
  , {
    path: 'facturacion',
    loadChildren: './facturacion/facturacion.module#FacturacionPageModule'
  }
  , {
    path: 'registro-facturacion',
    loadChildren: './registro-facturacion/registro-facturacion.module#RegistroFacturacionPageModule'
  }
  , {
    path: 'equipo-empresas',
    loadChildren: './equipo-empresas/equipo-empresas.module#EquipoEmpresasPageModule'
  }
  , {
    path: 'miembros-equipo-empresas',
    loadChildren: './miembros-equipo-empresas/miembros-equipo-empresas.module#MiembrosEquipoEmpresasPageModule'
  }
  , {
    path: 'cuenta-asociada',
    loadChildren: './cuenta-asociada/cuenta-asociada.module#CuentaAsociadaPageModule'
  }
  , {
    path: 'beneficio',
    loadChildren: './beneficio/beneficio.module#BeneficioPageModule'
  }
  , {
    path: 'empresa',
    loadChildren: './empresa/empresa.module#EmpresaPageModule'
  }
  , {
    path: 'landing',
    loadChildren: './landing/landing.module#LandingPageModule'
  }
  , {
    path: 'productos-servicios',
    loadChildren: './productos-servicios/productos-servicios.module#ProductosServiciosPageModule'
  }
  , {
    path: 'pais',
    loadChildren: './pais/pais.module#PaisPageModule'
  }
  , {
    path: 'ciudad',
    loadChildren: './ciudad/ciudad.module#CiudadPageModule'
  }
  , {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogPageModule'
  }
  , {
    path: 'video-blog',
    loadChildren: './video-blog/video-blog.module#VideoBlogPageModule'
  }
  , {
    path: 'comentario-blog',
    loadChildren: './comentario-blog/comentario-blog.module#ComentarioBlogPageModule'
  }
  , {
    path: 'comentario-video-blog',
    loadChildren: './comentario-video-blog/comentario-video-blog.module#ComentarioVideoBlogPageModule'
  }
  , {
    path: 'feed',
    loadChildren: './feed/feed.module#FeedPageModule'
  }
  , {
    path: 'comentario-feed',
    loadChildren: './comentario-feed/comentario-feed.module#ComentarioFeedPageModule'
  }
  , {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatPageModule'
  }
  , {
    path: 'chats-listado',
    loadChildren: './chats-listado/chats-listado.module#ChatsListadoPageModule'
  }
  , {
    path: 'evento',
    loadChildren: './evento/evento.module#EventoPageModule'
  }
  , {
    path: 'categoria-contenidos',
    loadChildren: './categoria-contenidos/categoria-contenidos.module#CategoriaContenidosPageModule'
  }
  , {
    path: 'grupos',
    loadChildren: './grupos/grupos.module#GruposPageModule'
  }
  , {
    path: 'miembros-grupo',
    loadChildren: './miembros-grupo/miembros-grupo.module#MiembrosGrupoPageModule'
  }
  , {
    path: 'recursos-fisicos',
    loadChildren: './recursos-fisicos/recursos-fisicos.module#RecursosFisicosPageModule'
  }
  , {
    path: 'uso-recurso-fisico',
    loadChildren: './uso-recurso-fisico/uso-recurso-fisico.module#UsoRecursoFisicoPageModule'
  }
  , {
    path: 'tipo-recurso',
    loadChildren: './tipo-recurso/tipo-recurso.module#TipoRecursoPageModule'
  }
  , {
    path: 'consumo-market',
    loadChildren: './consumo-market/consumo-market.module#ConsumoMarketPageModule'
  }
  , {
    path: 'prepago-consumo',
    loadChildren: './prepago-consumo/prepago-consumo.module#PrepagoConsumoPageModule'
  }
  , {
    path: 'margen-newo-eventos',
    loadChildren: './margen-newo-eventos/margen-newo-eventos.module#MargenNewoEventosPageModule'
  }
  , {
    path: 'margen-newo-grupos',
    loadChildren: './margen-newo-grupos/margen-newo-grupos.module#MargenNewoGruposPageModule'
  }
  , {
    path: 'margen-newo-blog',
    loadChildren: './margen-newo-blog/margen-newo-blog.module#MargenNewoBlogPageModule'
  }
  , {
    path: 'margen-newo-productos',
    loadChildren: './margen-newo-productos/margen-newo-productos.module#MargenNewoProductosPageModule'
  }
  , {
    path: 'tipo-prepago-consumo',
    loadChildren: './tipo-prepago-consumo/tipo-prepago-consumo.module#TipoPrepagoConsumoPageModule'
  }
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes), TranslateModule],
  declarations: [EntitiesPage]
})
export class EntitiesPageModule {}
