import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

const unidadeRootPath = 'api/unidade/';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  unidades: any[] = [];
  unidadeSelecionada: any;

  constructor(private http: HttpClient) { }

  setarUnidades(unidades, idUnidade:number) {
    if(this.unidades.length == 0){
      this.unidades = unidades;
    }
      this.unidadeSelecionada = _.filter(this.unidades, unidade => unidade.id == idUnidade)[0];
  }
 

  getPorUsuario() {
    return this.http.get(unidadeRootPath + `usuario/`);
  }

}


