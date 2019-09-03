import { ColaboradoresPrograma } from './../../core/colaboradores-programa';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const rootPath = 'api/colaboradoresprograma/';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresProgramaService {

  constructor(private http: HttpClient) { }

  getAll(idUnidade:number) {
    return this.http.get(rootPath + `unidade/${idUnidade}`);
  }

  getById(id:number) {
    return this.http.get(rootPath + `${id}`);
  }
 
  cadastrar(colaboradoresPrograma:ColaboradoresPrograma) {
    return this.http.post(rootPath, colaboradoresPrograma);
  }

  alterar(colaboradoresPrograma:ColaboradoresPrograma) {
    return this.http.put(rootPath, colaboradoresPrograma);
  }

  excluir(id:number) {
    return this.http.delete(rootPath+ `${id}`);
  }
}
