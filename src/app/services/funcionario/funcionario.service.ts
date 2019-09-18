import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from './../../core/funcionario';


const rootPath = 'api/funcionario/';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id: number) {
    return this.http.get(rootPath + `${id}`);
  }

  cadastrar(funcionario: Funcionario) {
    return this.http.post(rootPath, funcionario);
  }

  alterar(funcionario: Funcionario) {
    return this.http.put(rootPath, funcionario);
  }

  excluir(id: number) {
    return this.http.delete(rootPath + `${id}`);
  }
}

