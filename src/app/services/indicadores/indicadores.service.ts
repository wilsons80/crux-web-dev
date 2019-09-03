import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Indicadores } from 'src/app/core/indicadores';


const indicadoresRootPath = 'api/indicadores/';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  constructor(private http: HttpClient) { }

  getAll(idUnidade:number) {
    return this.http.get(indicadoresRootPath + `unidade/${idUnidade}`);
  }

  getIndicadoresById(idOjetivo:number) {
    return this.http.get(indicadoresRootPath + `${idOjetivo}`);
  }
 
  cadastrar(indicadores:Indicadores) {
    return this.http.post(indicadoresRootPath, indicadores);
  }

  alterar(indicadores:Indicadores) {
    return this.http.put(indicadoresRootPath, indicadores);
  }

  excluir(idOjetivo:number) {
    return this.http.delete(indicadoresRootPath+ `${idOjetivo}`);
  }
}
