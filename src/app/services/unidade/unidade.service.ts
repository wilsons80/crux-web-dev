import { Unidade } from './../../core/unidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { BaseService } from '../base/base.service';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { Rotas } from 'src/app/core/rotas';


@Injectable({
  providedIn: 'root'
})
export class UnidadeService extends BaseService<Unidade> {

  constructor(http: HttpClient) {
    super(http, Rotas.UNIDADE);
  }


  getUnidadeSetandoLogada(idUnidade:number){
    return this.http.get(Rotas.UNIDADE + `logada/${idUnidade}`);
  }

  getAllTiposUnidade() {
    return this.http.get(Rotas.UNIDADE + `tiposunidade`);
  }

  getAllClassificadorSituacaoImovel() {
    return this.http.get(Rotas.UNIDADE + `classificadorimovel`);
  }

  getUnidadesComAcesso() {
    return this.http.get(Rotas.UNIDADE + `usuario`);
  }

  getAllUnidadesUsuarioLogadoTemAcesso(){
    return this.http.get(Rotas.UNIDADE);
  }

  

}
