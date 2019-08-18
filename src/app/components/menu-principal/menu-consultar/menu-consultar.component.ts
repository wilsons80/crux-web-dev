import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Modulos } from 'src/app/core/modulos';
import { ModulosUsuarioService } from 'src/app/services/modulos/modulos-usuario.service';

const cursos = Modulos.CADASTRO_CURSOS;

@Component({
  selector: 'menu-consultar',
  templateUrl: './menu-consultar.component.html',
  styleUrls: ['./menu-consultar.component.css'],
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
export class MenuConsultarComponent implements OnInit {

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
