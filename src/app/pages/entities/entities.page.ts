import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-entities',
  templateUrl: 'entities.page.html',
  styleUrls: ['entities.page.scss']
})
export class EntitiesPage {
  entities: Array<any> = [
    {name: 'Invitados', component: 'InvitadosPage', route: 'invitados'},
    {name: 'Invitacion', component: 'InvitacionPage', route: 'invitacion'},
    {name: 'Miembros', component: 'MiembrosPage', route: 'miembros'},
    {name: 'EntradaMiembros', component: 'EntradaMiembrosPage', route: 'entrada-miembros'},
    {name: 'EntradaInvitados', component: 'EntradaInvitadosPage', route: 'entrada-invitados'},
    {name: 'Sedes', component: 'SedesPage', route: 'sedes'},
    {name: 'EspacioLibre', component: 'EspacioLibrePage', route: 'espacio-libre'},
    {name: 'TipoEspacio', component: 'TipoEspacioPage', route: 'tipo-espacio'},
    {name: 'HostSede', component: 'HostSedePage', route: 'host-sede'},
    {name: 'Reservas', component: 'ReservasPage', route: 'reservas'},
    {name: 'EspaciosReserva', component: 'EspaciosReservaPage', route: 'espacios-reserva'},
    {name: 'RegistroCompra', component: 'RegistroCompraPage', route: 'registro-compra'},
    {name: 'TipoRegistroCompra', component: 'TipoRegistroCompraPage', route: 'tipo-registro-compra'},
    {name: 'Facturacion', component: 'FacturacionPage', route: 'facturacion'},
    {name: 'RegistroFacturacion', component: 'RegistroFacturacionPage', route: 'registro-facturacion'},
    {name: 'EquipoEmpresas', component: 'EquipoEmpresasPage', route: 'equipo-empresas'},
    {name: 'MiembrosEquipoEmpresas', component: 'MiembrosEquipoEmpresasPage', route: 'miembros-equipo-empresas'},
    {name: 'CuentaAsociada', component: 'CuentaAsociadaPage', route: 'cuenta-asociada'},
    {name: 'Beneficio', component: 'BeneficioPage', route: 'beneficio'},
    {name: 'Empresa', component: 'EmpresaPage', route: 'empresa'},
    {name: 'Landing', component: 'LandingPage', route: 'landing'},
    {name: 'ProductosServicios', component: 'ProductosServiciosPage', route: 'productos-servicios'},
    {name: 'Pais', component: 'PaisPage', route: 'pais'},
    {name: 'Ciudad', component: 'CiudadPage', route: 'ciudad'},
    {name: 'Blog', component: 'BlogPage', route: 'blog'},
    {name: 'VideoBlog', component: 'VideoBlogPage', route: 'video-blog'},
    {name: 'ComentarioBlog', component: 'ComentarioBlogPage', route: 'comentario-blog'},
    {name: 'ComentarioVideoBlog', component: 'ComentarioVideoBlogPage', route: 'comentario-video-blog'},
    {name: 'Feed', component: 'FeedPage', route: 'feed'},
    {name: 'ComentarioFeed', component: 'ComentarioFeedPage', route: 'comentario-feed'},
    {name: 'Chat', component: 'ChatPage', route: 'chat'},
    {name: 'ChatsListado', component: 'ChatsListadoPage', route: 'chats-listado'},
    {name: 'Evento', component: 'EventoPage', route: 'evento'},
    {name: 'CategoriaContenidos', component: 'CategoriaContenidosPage', route: 'categoria-contenidos'},
    {name: 'Grupos', component: 'GruposPage', route: 'grupos'},
    {name: 'MiembrosGrupo', component: 'MiembrosGrupoPage', route: 'miembros-grupo'},
    {name: 'RecursosFisicos', component: 'RecursosFisicosPage', route: 'recursos-fisicos'},
    {name: 'UsoRecursoFisico', component: 'UsoRecursoFisicoPage', route: 'uso-recurso-fisico'},
    {name: 'TipoRecurso', component: 'TipoRecursoPage', route: 'tipo-recurso'},
    {name: 'ConsumoMarket', component: 'ConsumoMarketPage', route: 'consumo-market'},
    {name: 'PrepagoConsumo', component: 'PrepagoConsumoPage', route: 'prepago-consumo'},
    {name: 'MargenNewoEventos', component: 'MargenNewoEventosPage', route: 'margen-newo-eventos'},
    {name: 'MargenNewoGrupos', component: 'MargenNewoGruposPage', route: 'margen-newo-grupos'},
    {name: 'MargenNewoBlog', component: 'MargenNewoBlogPage', route: 'margen-newo-blog'},
    {name: 'MargenNewoProductos', component: 'MargenNewoProductosPage', route: 'margen-newo-productos'},
    {name: 'TipoPrepagoConsumo', component: 'TipoPrepagoConsumoPage', route: 'tipo-prepago-consumo'},
    /* jhipster-needle-add-entity-page - JHipster will add entity pages here */
  ];

  constructor(public navController: NavController) {}

  openPage(page) {
    this.navController.navigateForward('/tabs/entities/' + page.route);
  }
}
