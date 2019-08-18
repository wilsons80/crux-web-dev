import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const unidadeRootPath = 'api/unidade/';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  constructor(private http: HttpClient) { }

  getPorUsuario(idUsuario:number){
    return this.http.get(unidadeRootPath + `usuario/${idUsuario}`);
  }
  
}


