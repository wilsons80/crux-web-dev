import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModulosUsuarioService {

  acessos: [];

  constructor() { }

  ngOnInit(): void {
  }


  setAcessos(acessos){
    this.acessos = acessos;
  }

  getAcessos(){
    return this.acessos;
  }

}
