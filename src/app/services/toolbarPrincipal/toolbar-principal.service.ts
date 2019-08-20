import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

const unidadeRootPath = 'api/unidade/';

@Injectable({
  providedIn: 'root'
})
export class ToolbarPrincipalService {
  

  unidades: any[] = [];
  unidadeSelecionada: any;
  username: string;

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

  setarUsername(username: any) {
    this.username = username;
    
  }

}