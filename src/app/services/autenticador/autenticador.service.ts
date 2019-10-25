import { ToastService } from './../toast/toast.service';
import { MenuPrincipalService } from './../menuPrincipal/menu-principal.service';
import { ArquivoPessoaFisicaService } from './../arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
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
import { TrocaSenha } from './../../core/troca-senha';
import { Usuario } from './../../core/usuario';
import { FileUtils } from './../../utils/file-utils';
import { ArquivoUnidadeService } from './../arquivo/arquivo.service';
import { ToolbarPrincipalService } from './../toolbarPrincipal/toolbar-principal.service';
import { AcessoUnidade } from 'src/app/core/acesso-unidade';




const autenticadorRootPath = 'api/autenticador/';
const tokenRootPath = 'api/token/';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {
  tempoSessao$ = new EventEmitter();
  usuarioLogado: UsuarioLogado;
  usuarioEstaLogado = false;

  constructor(
    private http: HttpClient,
    private toolbarPrincipalService: ToolbarPrincipalService,
    private toastService: ToastService,
    private arquivoService: ArquivoUnidadeService,
    private fileUtils: FileUtils,
    private parametros: ParametrosService,
    private menuService: MenuService,
    private controleMenuService: ControleMenuService,
    private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
    private menuPrincipalService: MenuPrincipalService,
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
    localStorage.removeItem('fotoPerfil');
    this.usuarioEstaLogado = false
  }

  refreshToken() {
    this.parametros.getTimeExpiredToken().subscribe((valor: number) => {
      this.tempoSessao$.emit({valor});
      if (moment().isBetween(this.getExpiration().subtract(valor, 'minutes'), this.getExpiration())) {
        return this.http.get(tokenRootPath + `refresh-token`)
          .pipe(

            /** Dados do Usuario Logado */ 
            switchMap((usuarioLogado: UsuarioLogado) => {
              this.usuarioLogado = usuarioLogado;
              this.setSession(usuarioLogado);
              this.toolbarPrincipalService.setarPropriedadesUsuarioLogado(usuarioLogado);
              return this.getLogoUnidade(usuarioLogado.unidadeLogada);
            }),

            /** Logo da Unidade */ 
            switchMap((arquivoRetorno) => {
              this.setArquivo(arquivoRetorno);
              return this.getMenu();
            }),

            /** Menu */
            switchMap((menu: Menu[]) => {
              this.controleMenuService.acessos = menu;
              return this.getFotoUsuario(this.usuarioLogado.unidadeLogada);
            }),

            shareReplay(),

            /** Foto Perfil */
          ).subscribe((arquivoPFRetorno) => {
            this.setFotoPerfil(arquivoPFRetorno);
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

  getLogoUnidade(unidadeLogada:AcessoUnidade){
    if (unidadeLogada && !localStorage.getItem("logo")) {
      return this.arquivoService.get(unidadeLogada.id)
    } else {
      this.toolbarPrincipalService.logo = localStorage.getItem("logo");
      return new Observable(obs => obs.next())
    }

  }
  
  getFotoUsuario(unidadeLogada:AcessoUnidade){
    if (unidadeLogada && !localStorage.getItem("fotoPerfil")) {
      return this.arquivoPessoaFisicaService.get(this.usuarioLogado.idPessoaFisica)
    } else {
      this.menuPrincipalService.fotoPerfil = localStorage.getItem("fotoPerfil");
      return new Observable(obs => obs.next())
    }

  }

  setArquivo(arquivoRetorno){
    if (arquivoRetorno) {
      let arquivo: any = this.fileUtils.convertBufferArrayToBase64(arquivoRetorno)
      let urlArquivo = arquivo.changingThisBreaksApplicationSecurity
      localStorage.setItem("logo", urlArquivo);
      this.toolbarPrincipalService.logo = urlArquivo;
    }
  }

  setFotoPerfil(arquivoPFRetorno){
    if (arquivoPFRetorno) {
      let arquivo: any = this.fileUtils.convertBufferArrayToBase64(arquivoPFRetorno)
      let urlArquivo = arquivo.changingThisBreaksApplicationSecurity
      localStorage.setItem("fotoPerfil", urlArquivo);
      this.menuPrincipalService.fotoPerfil = urlArquivo;
    }
  }

  getMenu(){
    if (this.toolbarPrincipalService.unidadeSelecionada) {
      return this.menuService.getMenuPrincipal()
    } else {
      return new Observable(obs => obs.next())
    }
  }
}
