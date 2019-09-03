import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objetivo } from 'src/app/core/objetivo';

const objetivoRootPath = 'api/objetivo/';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {

  constructor(private http: HttpClient) { }

  getAll(idUnidade:number) {
    return this.http.get(objetivoRootPath + `unidade/${idUnidade}`);
  }

  getObjetivoById(idOjetivo:number) {
    return this.http.get(objetivoRootPath + `${idOjetivo}`);
  }
 
  cadastrar(objetivo:Objetivo) {
    return this.http.post(objetivoRootPath, objetivo);
  }

  alterar(objetivo:Objetivo) {
    return this.http.put(objetivoRootPath, objetivo);
  }

  excluir(idOjetivo:number) {
    return this.http.delete(objetivoRootPath+ `${idOjetivo}`);
  }
  
}
