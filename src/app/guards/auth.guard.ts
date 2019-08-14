import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticadorService } from '../services/autenticador/autenticador.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private autenticadorService: AutenticadorService,
    private router: Router) { }

  canActivate() {
    if (this.autenticadorService.isLoggedIn()) {
      this.autenticadorService.refreshToken();

      return true;
    } else {
      this.autenticadorService.logout();
      this.router.navigate(['login']);

      return false;
    }
  }
}