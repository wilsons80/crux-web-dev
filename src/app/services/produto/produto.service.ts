import { Produto } from './../../core/produto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const rootPath = 'api/produto/';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id:number) {
    return this.http.get(rootPath + `${id}`);
  }
 
  cadastrar(produto:Produto) {
    return this.http.post(rootPath, produto);
  }

  alterar(produto:Produto) {
    return this.http.put(rootPath, produto);
  }

  excluir(id:number) {
    return this.http.delete(rootPath+ `${id}`);
  }
}
