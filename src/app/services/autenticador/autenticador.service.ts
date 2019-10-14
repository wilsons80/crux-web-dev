import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Menu } from 'src/app/core/menu';
import { UsuarioLogado } from 'src/app/core/usuario-logado';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ParametrosService } from '../parametros/parametros.service';
import { TempoSessaoService } from '../tempo-sessao/tempo-sessao.service';
import { TrocaSenha } from './../../core/troca-senha';
import { Usuario } from './../../core/usuario';
import { FileUtils } from './../../utils/file-utils';
import { ArquivoUnidadeService } from './../arquivo/arquivo.service';
import { ToolbarPrincipalService } from './../toolbarPrincipal/toolbar-principal.service';




const autenticadorRootPath = 'api/autenticador/';
const tokenRootPath = 'api/token/';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {
  tempoSessao$ = new EventEmitter();
  constructor(
    private http: HttpClient,
    private toolbarPrincipalService: ToolbarPrincipalService,
    private arquivoService: ArquivoUnidadeService,
    private fileUtils: FileUtils,
    private parametros: ParametrosService,
    private menuService: MenuService,
    private controleMenuService: ControleMenuService,
    private tempoSessaoService: TempoSessaoService,
  ) {

  }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload>jwtDecode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(usuario: Usuario) {
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
    localStorage.removeItem('logo');
  }

  refreshToken() {
    this.parametros.getTimeExpiredToken().subscribe((valor: number) => {
      this.tempoSessao$.emit({valor});
      if (moment().isBetween(this.getExpiration().subtract(valor, 'minutes'), this.getExpiration())) {
        return this.http.get(tokenRootPath + `refresh-token`)
          .pipe(

            switchMap((usuarioLogado: UsuarioLogado) => {

              this.setSession(usuarioLogado)

              this.toolbarPrincipalService.setarPropriedadesUsuarioLogado(usuarioLogado);

              if (usuarioLogado.unidadeLogada && !localStorage.getItem("logo")) {
                return this.arquivoService.get(usuarioLogado.unidadeLogada.id)
              } else {
                this.toolbarPrincipalService.logo = localStorage.getItem("logo");
                return new Observable(obs => obs.next())
              }
            }),

            switchMap((arquivoRetorno) => {
              if (arquivoRetorno) {
                let arquivo: any = this.fileUtils.convertBufferArrayToBase64(arquivoRetorno)
                let urlArquivo = arquivo.changingThisBreaksApplicationSecurity
                localStorage.setItem("logo", urlArquivo);
                this.toolbarPrincipalService.logo = urlArquivo;
              }


              if (this.toolbarPrincipalService.unidadeSelecionada) {
                return this.menuService.getMenuPrincipal()
              } else {
                return new Observable(obs => obs.next())
              }


            }),
            shareReplay(),
          ).subscribe((menu: Menu[]) => {
            this.controleMenuService.acessos = menu;
          });
      }
    });

  }
  setSessionTimeout(valor: number) {
    this.tempoSessao$.emit({valor})
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

  trocarSenha(trocaSenha: TrocaSenha) {
    return this.http.post(autenticadorRootPath + `trocar-senha`, trocaSenha);
  }

}
