import { Departamento } from './../../core/departamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const departamentoRootPath = 'api/departamento/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  getDepartamentosPorUnidade(idUnidade:number){
    return this.http.get(departamentoRootPath + `unidade/${idUnidade}`);
  }
  
  cadastrar(departamento:Departamento){
    return this.http.post(departamentoRootPath , departamento);
  }
 
  alterar(departamento:Departamento){
    return this.http.put(departamentoRootPath , departamento);
  }
 
  getDepartamentoById(idDepartamento:number){
    return this.http.get(departamentoRootPath + `${idDepartamento}`);
  }
 
  excluir(idDepartamento:number){
    return this.http.delete(departamentoRootPath + `${idDepartamento}`, httpOptions);
  }
  
}

	