import { Unidade } from './../../core/unidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

const unidadeRootPath = 'api/unidade/';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  constructor(private http: HttpClient) { }


  getAllTiposUnidade() {
    return this.http.get(unidadeRootPath + `tiposunidade`);
  }

  getAllClassificadorSituacaoImovel() {
    return this.http.get(unidadeRootPath + `classificadorimovel`);
  }

  getUnidadesComAcesso() {
    return this.http.get(unidadeRootPath + `usuario`);
  }

  getUnidadePorId(idUnidade:number){
    return this.http.get(unidadeRootPath + `logada/${idUnidade}`);
  }

  getAllUnidadesUsuarioLogadoTemAcesso(){
    return this.http.get(unidadeRootPath);
  }

  cadastrar(unidade:Unidade){
    return this.http.post(unidadeRootPath, unidade);
  }

  alterar(unidade:Unidade){
    return this.http.put(unidadeRootPath, unidade);
  }

  excluir(idUnidade:number){
    return this.http.delete(unidadeRootPath + `${idUnidade}`);
  }

}
