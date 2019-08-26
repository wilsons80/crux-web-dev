import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

const unidadeRootPath = 'api/unidade/';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  constructor(private http: HttpClient) { }


  getPorUsuario() {
    return this.http.get(unidadeRootPath + `usuario/`);
  }

  getUnidadePorId(idUnidade:number){
    return this.http.get(unidadeRootPath + `${idUnidade}`);
  }

  getAllUnidadesUsuarioLogadoTemAcesso(){
    return this.http.get(unidadeRootPath);
  }
}
