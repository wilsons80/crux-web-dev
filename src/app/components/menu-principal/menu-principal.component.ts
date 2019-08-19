import { Modulos } from './../../core/modulos';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

    cursos = Modulos.CURSOS;
    alunos = Modulos.ALUNOS;
    unidades = Modulos.UNIDADES;

  constructor(private controleMenuService:ControleMenuService) { }


  ngOnInit() {
    
  }
  
  mostrarMenu(modulo){
    return this.controleMenuService.acessoModulos[modulo].mostrarMenu;
  }

}
