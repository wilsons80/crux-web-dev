import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atividade } from 'src/app/core/atividade';

const rootPath = 'api/atividade/';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id:number) {
    return this.http.get(rootPath + `${id}`);
  }
 
  cadastrar(atividade:Atividade) {
    return this.http.post(rootPath, atividade);
  }

  alterar(atividade:Atividade) {
    return this.http.put(rootPath, atividade);
  }

  excluir(id:number) {
    return this.http.delete(rootPath+ `${id}`);
  }
}
