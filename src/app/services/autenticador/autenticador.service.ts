import { ToolbarPrincipalService } from './../toolbarPrincipal/toolbar-principal.service';
import { Usuario } from './../../core/usuario';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { tap, shareReplay } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { UsuarioLogado } from 'src/app/core/usuario-logado';

const autenticadorRootPath = 'api/autenticador/';
const tokenRootPath = 'api/token/';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  constructor(
    private http: HttpClient,
    private toolbarPrincipalService:ToolbarPrincipalService
    ) { }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload> jwtDecode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(usuario:Usuario) {
    return this.http.post(autenticadorRootPath + `login`, usuario).pipe(
      tap(response => 
        this.setSession(response)
        ),
      shareReplay(),
    );  
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(3, 'day'), this.getExpiration())) {
      return this.http.get(tokenRootPath + `refresh-token`)
      .pipe(
        tap((usuarioLogado:UsuarioLogado) => {
          console.log("refresca token", usuarioLogado);
          this.setSession(usuarioLogado)
          this.toolbarPrincipalService.setarPropriedadesUsuarioLogado(usuarioLogado);
        }),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }


}
