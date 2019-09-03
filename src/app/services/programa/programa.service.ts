import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Programa } from 'src/app/core/programa';


const rootPath = 'api/programa/';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private http: HttpClient) { }

  getAll(idUnidade:number) {
    return this.http.get(rootPath + `unidade/${idUnidade}`);
  }

  getById(id:number) {
    return this.http.get(rootPath + `${id}`);
  }
 
  cadastrar(programa:Programa) {
    return this.http.post(rootPath, programa);
  }

  alterar(programa:Programa) {
    return this.http.put(rootPath, programa);
  }

  excluir(id:number) {
    return this.http.delete(rootPath+ `${id}`);
  }

}
