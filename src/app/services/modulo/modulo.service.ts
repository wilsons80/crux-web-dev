import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const moduloRootPath = 'api/modulo/';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(private http: HttpClient) { }

  getModulosPorUnidade(idUnidade:number){
    return this.http.get(moduloRootPath + `/unidade/${idUnidade}`);
  }

}


