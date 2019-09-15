import { AcessoUnidade } from './../../core/acesso-unidade';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogado } from 'src/app/core/usuario-logado';
import { UnidadeService } from '../unidade/unidade.service';

const unidadeRootPath = 'api/unidade/';

@Injectable({
  providedIn: 'root'
})
export class ToolbarPrincipalService {


  unidades: AcessoUnidade[] = [];
  unidadeSelecionada: AcessoUnidade;
  username: string;
  nomeUsuario: string;
  logo:any;

  constructor(private http: HttpClient,
    private unidadeService: UnidadeService) { }

  getPorUsuario() {
    return this.unidadeService.getUnidadesComAcesso();
  }

  setarPropriedadesUsuarioLogado(usuarioLogado: UsuarioLogado) {
    this.unidades = usuarioLogado.unidades;
    if (usuarioLogado.unidadeLogada) {
      this.unidadeSelecionada = _.filter(this.unidades, unidade => unidade.id == usuarioLogado.unidadeLogada.id)[0];
    }
    this.username = usuarioLogado.username;
    this.nomeUsuario = usuarioLogado.nomeUsuario;
  }

  apagaPropriedadesdoUsuarioLogado() {
    this.unidades = [];
    this.unidadeSelecionada = null
    this.username = null
    this.nomeUsuario = null;
  }

}
