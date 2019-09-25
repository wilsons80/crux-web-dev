import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from 'src/app/core/cargo';


const rootPath = 'api/condicaomoradia/';

@Injectable({
  providedIn: 'root'
})
export class CondicoesMoradiaService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(rootPath);
  }

  getById(id: number) {
    return this.http.get(rootPath + `${id}`);
  }

  cadastrar(condicoesMoradia: CondicoesMoradia) {
    return this.http.post(rootPath, condicoesMoradia);
  }

  alterar(condicoesMoradia: CondicoesMoradia) {
    return this.http.put(rootPath, condicoesMoradia);
  }

  excluir(id: number) {
    return this.http.delete(rootPath + `${id}`);
  }
}