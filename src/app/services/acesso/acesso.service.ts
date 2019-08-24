import { CadastroAcessoTO } from './../../core/cadastroAcessoTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


const acessoRootPath = 'api/acesso/';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(private http: HttpClient) { }
  
  getAllAcessos(idUnidade:number){
    return this.http.get(acessoRootPath + `usuario/unidade/${idUnidade}`);
  }

  getPerfilAcesso(idUnidade:number, idUsuario:number|string, idModulo:number|string){
    if(idUsuario == undefined) idUsuario = "";
    if(idModulo == undefined) idModulo = "";

    return this.http.get(acessoRootPath + `perfil/unidade/${idUnidade}`, {params: {
       usuario: `${idUsuario}`,
       modulo: `${idModulo}`
    }});
  }

  cadastrarAcesso(cadastroAcessoTO:CadastroAcessoTO){
    return this.http.post(acessoRootPath , cadastroAcessoTO);
  }
  
}


