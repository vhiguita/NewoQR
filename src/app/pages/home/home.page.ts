import { Component, OnInit } from '@angular/core';
import { HttpResponse , HttpErrorResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { NavController } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';
import { AccountService } from 'src/app/services/auth/account.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Invitacion } from 'src/app/pages/entities/invitacion/invitacion.model';
import { InvitacionService } from 'src/app/pages/entities/invitacion/invitacion.service';
import { EntradaInvitados } from 'src/app/pages/entities/entrada-invitados/entrada-invitados.model';
import { EntradaInvitadosService } from 'src/app/pages/entities/entrada-invitados/entrada-invitados.service';
import { EntradaMiembros } from 'src/app/pages/entities/entrada-miembros/entrada-miembros.model';
import { EntradaMiembrosService } from 'src/app/pages/entities/entrada-miembros/entrada-miembros.service';
import { Miembros } from 'src/app/pages/entities/miembros/miembros.model';
import { MiembrosService } from 'src/app/pages/entities/miembros/miembros.service';
import { User } from 'src/app/services/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Sedes } from 'src/app/pages/entities/sedes/sedes.model';
import { SedesService } from 'src/app/pages/entities/sedes/sedes.service';
import { Account } from 'src/model/account.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  account: Account;
  invitaciones: Invitacion[];
  miembros: Miembros[];
  users: User[];
  sedes: Sedes[];
  entradaMiembros: EntradaMiembros[];
  //user: any;
  user: any = {
    QRCode: ''
  };
  b1: boolean = true;
  b2: boolean = true;


  constructor(
    public navController: NavController,
    private accountService: AccountService,
    private loginService: LoginService,
    public toastController: ToastController,
    private invitacionService: InvitacionService,
    private miembrosService: MiembrosService,
    private userService:UserService,
    private sedesService: SedesService,
    private entradaInvitadosService: EntradaInvitadosService,
    private entradaMiembrosService: EntradaMiembrosService
  ) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
      }
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.goBackToHomePage();
  }

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }
  async doLogin() {
    this.b1 = true;
    this.b2 = true;
    var input = this.user.QRCode;
    var fields = input.split(',');
    var code1 = Number(fields[0].trim());// it indicates it's type member (1) or invitation (2)
    var code2 = Number(fields[1].trim());// member code or invitation code
    console.log(code1);
    console.log(code2);

    if(code1 == 1){ //type member
      console.log('codigo 1');
      this.miembrosService.query({
        'id.equals' : code2
      }).pipe(
          filter((res: HttpResponse<Miembros[]>) => res.ok),
          map((res: HttpResponse<Miembros[]>) => res.body)
      )
      .subscribe(
          (response: Miembros[]) => {
              this.miembros = response;

              if(this.miembros.length == 0){
                this.b2 = false;
              }else{
                var id = this.miembros[0]['user']['id'];// member id code
                //var sedeId = 1151;
                var sedeId = Number(fields[2].trim());// campus code
                this.userService.query().pipe(
                      filter((res: HttpResponse<User[]>) => res.ok),
                      map((res: HttpResponse<User[]>) => res.body)
                )
                .subscribe(
                      (response: User[]) => {
                          this.users = response;
                          //console.log(this.users);
                          const user = this.users.filter(element => element.id === id);
                          console.log(user[0].activated);
                          if(user[0].activated){
                             //this.b1 = false;
                             this.sedesService.query({
                               'id.equals' : sedeId
                             }).pipe(
                                 filter((res: HttpResponse<Sedes[]>) => res.ok),
                                 map((res: HttpResponse<Sedes[]>) => res.body)
                             )
                             .subscribe(
                                 (response: Sedes[]) => {
                                     this.sedes = response;
                                     if(this.sedes.length == 0){
                                       this.b2 = false;
                                     }else{
                                         //console.log(this.sedes);
                                        var userId = id;
                                        var salida = false;
                                        var tiempoMax = false;
                                        var registroFecha = new Date().toISOString();
                                         /*console.log(userId);
                                         console.log(salida);
                                         console.log(tiempoMax);
                                         console.log(registroFecha);
                                         console.log(user);*/

                                        const entradaMiembros = this.createFromForm_(registroFecha, salida, tiempoMax, this.sedes[0], user[0]);
                                         //console.log(entradaMiembros);
                                        this.subscribeToSaveResponse_(this.entradaMiembrosService.create(entradaMiembros));
                                    }

                              });


                          }else{
                             this.b2 = false;
                          }
                      },
                );
              }
      });
    }else if(code1 == 2){ // type invitation
      console.log('codigo 2');
      this.invitacionService.query({
        'id.equals' : code2
      }).pipe(
          filter((res: HttpResponse<Invitacion[]>) => res.ok),
          map((res: HttpResponse<Invitacion[]>) => res.body)
      )
      .subscribe(
          (response: Invitacion[]) => {
              this.invitaciones = response;
              //console.log(this.invitaciones);
              if(this.invitaciones.length == 0){
                this.b2 = false;
              }else{
                //console.log(this.invitaciones);
                var invitadoId = this.invitaciones[0]['invitado']['id'];
                var invitado = this.invitaciones[0]['invitado'];
                var sedeId = this.invitaciones[0]['sede']['id'];
                var sede = this.invitaciones[0]['sede'];
                var salida = false;
                var tiempoMax = false;
                var registroFecha = new Date().toISOString();

                /*console.log(invitadoId+" "+sedeId);
                console.log(invitado);
                console.log(sede);
                console.log(registroFecha);*/
                const entradaInvitados = this.createFromForm(registroFecha, salida, tiempoMax, sede, invitado);
                //console.log(entradaInvitados);
                this.subscribeToSaveResponse(this.entradaInvitadosService.create(entradaInvitados));

              }
      });
    }else{
      const toast = await this.toastController.create({
        message: 'Código inválido.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    /*this.loginService.login(this.account).then(
      () => {
        this.navController.navigateRoot('/tabs');
      },
      async err => {
        // Unable to log in
        this.account.password = '';
        const toast = await this.toastController.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );*/
  }
  protected subscribeToSaveResponse_(result: Observable<HttpResponse<EntradaMiembros>>) {
      result.subscribe((res: HttpResponse<EntradaMiembros>) => this.onSaveSuccess_(res), (res: HttpErrorResponse) => this.onError_(res.error));
  }

  async onSaveSuccess_(response) {
      let action = 'updated';
      if (response.status === 201) {
        action = 'created';
      }
      const toast = await this.toastController.create({message: `EntradaMiembros ${action} successfully.`, duration: 2000, position: 'middle'});
      toast.present();
      this.b1 = false;
  }

  async onError_(error) {
      console.error(error);
      const toast = await this.toastController.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
      toast.present();
  }

  private createFromForm_(registroFecha, sal, tiempoMax, sede, user): EntradaMiembros {
      return {
          ...new EntradaMiembros(),
          id: undefined,
          registroFecha: registroFecha,
          salida: sal,
          tiempoMaximo: tiempoMax,
          user: user,
          sede: sede,
      };
  }
  private createFromForm(registroFecha, sal, tiempoMax, sede, invitado): EntradaInvitados {
      return {
          ...new EntradaInvitados(),
          id: undefined,
          registroFecha: registroFecha,
          salida: sal,
          tiempoMaximo: tiempoMax,
          sede: sede,
          invitado: invitado,
      };
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<EntradaInvitados>>) {
      result.subscribe((res: HttpResponse<EntradaInvitados>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
  }

  async onSaveSuccess(response) {
      let action = 'updated';
      if (response.status === 201) {
        action = 'created';
      }
      const toast = await this.toastController.create({message: `EntradaInvitados ${action} successfully.`, duration: 2000, position: 'middle'});
      toast.present();
      this.b1 = false;
  }
  async onError(error) {
      console.error(error);
      const toast = await this.toastController.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
      toast.present();
  }
}
