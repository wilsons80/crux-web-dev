import { ModulosUsuarioService } from './../../../services/modulos/modulos-usuario.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Modulos } from 'src/app/core/modulos';



@Component({
  selector: 'menu-cadastrar',
  templateUrl: './menu-cadastrar.component.html',
  styleUrls: ['./menu-cadastrar.component.css'],
  animations: [
    trigger('mostrarMenu', [
      state('hidden', style({
        visibility: 'hidden',
        opacity: 0
      })),
      state('show',   style({
        visibility: 'visible',
        opacity: 1
      })),
      transition('*=>show', animate('500ms')),
    ])
  ]
})
export class MenuCadastrarComponent implements OnInit {

  currentState = "hidden";


  constructor(private modulosUsuarioService:ModulosUsuarioService) { }

  isMostrarSubMenu: boolean = false;

  ngOnInit() {
  }
  
  toggle(){
    this.isMostrarSubMenu = !this.isMostrarSubMenu;
    if(this.isMostrarSubMenu){
      this.currentState = 'show';
    }else
      this.currentState = 'hidden';
  }

  possuiPermissaoCurso(){
    return this.modulosUsuarioService.acessoModulos[Modulos.CURSOS].insere === 'N';
  }
}
