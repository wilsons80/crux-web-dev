import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const acessoRootPath = 'api/acesso/';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(private http: HttpClient) { }
  
  getAllAcessos(idUnidade:number){
    return this.http.get(acessoRootPath + `usuario/3?idUnidade=${idUnidade}`);
  }
  
}
