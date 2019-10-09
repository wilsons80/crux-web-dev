import { MenuPrincipalService } from './../../../services/menuPrincipal/menu-principal.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { Modulos } from 'src/app/core/modulos';

@Component({
  selector: 'modulo-pedagogico',
  templateUrl: './modulo-pedagogico.component.html',
  styleUrls: ['./modulo-pedagogico.component.css'],
  animations: [
    trigger('menuState', [
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
export class ModuloPedagogicoComponent implements OnInit {


  currentState = "hidden"
  isMostrarSubMenu: boolean = false;
  
  constructor(
    public menuPrincipalService:MenuPrincipalService,
    private controleMenuService:ControleMenuService
    ) { }

  ngOnInit() {
  }

  toggle(){
    this.isMostrarSubMenu = !this.isMostrarSubMenu;
    if(this.isMostrarSubMenu){
      this.currentState = 'show';
    }else
      this.currentState = 'hidden';
  }

  getIcone(){
    return this.isMostrarSubMenu ? "expand_more" : "chevron_right";
  }

  getModulos() {
    return Modulos;
  }

  verificaAcesso(modulo:Modulos) {
    return this.controleMenuService.verificaAcessoModulo(modulo);
  }

}
