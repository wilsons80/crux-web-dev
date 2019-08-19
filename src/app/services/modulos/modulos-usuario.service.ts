import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Modulos } from 'src/app/core/modulos';

@Injectable({
  providedIn: 'root'
})
export class ModulosUsuarioService {

  mostraCadastrar = false;
  mostraConsultar = false;
  mostraDeletar = false;
  mostraAlterar = false;

  acessoModulos:any = {
    CURSOS : {
      altera: 'S',
      consulta: 'S',
      deleta: 'S', 
      insere: 'S'
    },
  };

   unidadeSelecionada: number;

  constructor() { }

  ngOnInit(): void {
  }

  setAcessos(acessos){
    console.log("acessos", acessos);
    this.setAcessosPorModulos(acessos, Modulos.CURSOS);
    
  }

  setAcessosPorModulos(acessos, modulo){
    
    let moduloEscolhido = _.filter(acessos, acesso => acesso.modulo === modulo);


    this.acessoModulos[modulo].consulta = moduloEscolhido.consulta;
    this.acessoModulos[modulo].altera = moduloEscolhido.altera;
    this.acessoModulos[modulo].insere = moduloEscolhido.insere;
    this.acessoModulos[modulo].deleta = moduloEscolhido.deleta;

    console.log("acessoModulos", this.acessoModulos);

  }

}
