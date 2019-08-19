import { ControleMenuService } from './../services/controle-menu/controle-menu.service';
import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticadorService } from '../services/autenticador/autenticador.service';
import { Observable } from 'rxjs';
import { AcessoService } from '../services/acesso/acesso.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuard implements CanActivate {

  mostrarMenu = new EventEmitter<boolean>();

  constructor(
    private autenticadorService: AutenticadorService,
    private router: Router,
    private acessoService:AcessoService,
    private controleMenuService:ControleMenuService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (this.autenticadorService.isLoggedIn()) {
      //TODO Esperando o BackEnd se resolver
      //this.autenticadorService.refreshToken();
      
      if(!route.routeConfig.path.includes('unidade/escolher')){
        this.mostrarMenu.emit(true);
      }

      let idUnidade = route.params.idUnidade;
      
      if(idUnidade){
        this.acessoService.getAllAcessos(idUnidade).subscribe(acessos => {
          console.log("acessos", acessos);
          this.controleMenuService.setAcessos(acessos);
         })
      }
       

      return true;
    } else {
      this.autenticadorService.logout();
      this.mostrarMenu.emit(false);
      this.router.navigate(['login']);

      return false;
    }
  }

}