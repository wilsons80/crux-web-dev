import { AcessoUnidade } from './../../core/acesso-unidade';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogado } from 'src/app/core/usuario-logado';

const unidadeRootPath = 'api/unidade/';

@Injectable({
  providedIn: 'root'
})
export class ToolbarPrincipalService {

  
  unidades: AcessoUnidade[] = [];
  unidadeSelecionada: AcessoUnidade;
  username: string;

  constructor(private http: HttpClient) { }
 
  getPorUsuario() {
    return this.http.get(unidadeRootPath + `usuario/`);
  }
  setarPropriedadesUsuarioLogado(usuarioLogado: UsuarioLogado) {
        this.unidades = usuarioLogado.unidades;
        this.unidadeSelecionada = _.filter(this.unidades, unidade => unidade.id == usuarioLogado.unidadeLogada.id)[0];
        this.username = usuarioLogado.username;
  }

}