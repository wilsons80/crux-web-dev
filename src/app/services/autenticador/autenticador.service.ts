import { FileUtils } from './../../utils/file-utils';
import { ArquivoService } from './../arquivo/arquivo.service';
import { TrocaSenha } from './../../core/troca-senha';
import { ToolbarPrincipalService } from './../toolbarPrincipal/toolbar-principal.service';
import { Usuario } from './../../core/usuario';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { tap, shareReplay, switchMap } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { UsuarioLogado } from 'src/app/core/usuario-logado';
import { Observable } from 'rxjs';
import { ParametrosService } from '../parametros/parametros.service';

const autenticadorRootPath = 'api/autenticador/';
const tokenRootPath = 'api/token/';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  constructor(
    private http: HttpClient,
    private toolbarPrincipalService:ToolbarPrincipalService,
    private arquivoService:ArquivoService,
    private fileUtils:FileUtils,
    private parametros: ParametrosService
  ) {

  }

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
    this.parametros.getTimeExpiredToken().subscribe((valor: number) => {
      if (moment().isBetween(this.getExpiration().subtract(valor, 'minutes'), this.getExpiration())) {
        return this.http.get(tokenRootPath + `refresh-token`)
        .pipe(
          switchMap((usuarioLogado:UsuarioLogado) => {
            this.setSession(usuarioLogado)
            this.toolbarPrincipalService.setarPropriedadesUsuarioLogado(usuarioLogado);
            if(usuarioLogado.unidadeLogada){
              return this.arquivoService.get(usuarioLogado.unidadeLogada.id)
            }else {
              return new Observable(obs => obs.next())
            }
          }),
          shareReplay(),
        ).subscribe((arquivo) => {
          this.toolbarPrincipalService.logo = this.fileUtils.convertBufferArrayToBase64(arquivo);
        });
      }
    });

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

  trocarSenha(trocaSenha:TrocaSenha){
    return this.http.post(autenticadorRootPath + `trocar-senha`,trocaSenha);
  }

}
