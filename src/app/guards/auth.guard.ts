import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticadorService } from '../services/autenticador/autenticador.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuard implements CanActivate {

  mostrarMenu = new EventEmitter<boolean>();

  constructor(
    private autenticadorService: AutenticadorService,
    private router: Router) { }

  canActivate() {
    if (this.autenticadorService.isLoggedIn()) {
      //TODO Esperando o BackEnd se resolver
      //this.autenticadorService.refreshToken();
      this.mostrarMenu.emit(true);
      return true;
    } else {
      this.autenticadorService.logout();
      this.mostrarMenu.emit(false);
      this.router.navigate(['login']);

      return false;
    }
  }
}