import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projeto } from 'src/app/core/projeto';


const rootPath = 'api/projeto/';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id:number) {
    return this.http.get(rootPath + `${id}`);
  }
 
  cadastrar(projeto:Projeto) {
    return this.http.post(rootPath, projeto);
  }

  alterar(projeto:Projeto) {
    return this.http.put(rootPath, projeto);
  }

  excluir(id:number) {
    return this.http.delete(rootPath+ `${id}`);
  }
}
