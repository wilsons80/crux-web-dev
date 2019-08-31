import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const departamentoRootPath = 'api/departamento/';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  getDepartamentosPorUnidade(idUnidade:number){
    return this.http.get(departamentoRootPath + `unidade/${idUnidade}`);
  }
}

