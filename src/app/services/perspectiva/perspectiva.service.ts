import { Perspectiva } from './../../core/perspectiva';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const perspectivaRootPath = 'api/perspectiva/';

@Injectable({
  providedIn: 'root'
})
export class PerspectivaService {

  constructor(private http: HttpClient) { }

  getAll(idUnidade:number) {
    return this.http.get(perspectivaRootPath + `unidade/${idUnidade}`);
  }

  getDepartamentoById(idDepartamento:number) {
    return this.http.get(perspectivaRootPath + `${idDepartamento}`);
  }
 
  cadastrar(perspectiva:Perspectiva) {
    return this.http.post(perspectivaRootPath, perspectiva);
  }

  alterar(perspectiva:Perspectiva) {
    return this.http.put(perspectivaRootPath, perspectiva);
  }

  excluir(idDepartamento:number) {
    return this.http.delete(perspectivaRootPath+ `${idDepartamento}`);
  }

}
	