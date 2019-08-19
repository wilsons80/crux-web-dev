import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const unidadeRootPath = 'api/unidade/';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  
  private _unidades: any[] =[];
  private _unidadeSelecionada: any;

  constructor(private http: HttpClient) { }

  get unidades(): any[] {
    return this._unidades;
  }
  set unidades(value: any[]) {
    this._unidades = value;
  }

  get unidadeSelecionada(): any {
    return this._unidadeSelecionada;
  }
  set unidadeSelecionada(value: any) {
    this._unidadeSelecionada = value;
  }



  getPorUsuario(idUsuario:number){
    return this.http.get(unidadeRootPath + `usuario/${idUsuario}`);
  }
  
}


