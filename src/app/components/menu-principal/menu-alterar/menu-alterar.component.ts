import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Modulos } from 'src/app/core/modulos';
import { ModulosUsuarioService } from 'src/app/services/modulos/modulos-usuario.service';

const cursos = Modulos.CURSOS;

@Component({
  selector: 'menu-alterar',
  templateUrl: './menu-alterar.component.html',
  styleUrls: ['./menu-alterar.component.css'],
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
export class MenuAlterarComponent implements OnInit {
  
  currentState = "hidden"
  isMostrarSubMenu: boolean = false;
  
  constructor(private modulosUsuarioService:ModulosUsuarioService) { }

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
    return true;
  }

}
