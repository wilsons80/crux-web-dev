import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Modulos } from './../../core/modulos';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';


@Component({
  selector: 'menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

    enumModulos = Modulos;

    teste = false;

  constructor(
    private controleMenuService:ControleMenuService,
    private toolbarPrincipalService:ToolbarPrincipalService,
    public menuPrincipalService:MenuPrincipalService,
    ) { }


  ngOnInit() {
    this.menuPrincipalService.toggle.subscribe(() =>this.teste = !this.teste );
    
  }
  
 
  fecharMenu(){
    this.teste = !this.teste;
    // this.menuPrincipalService.alternar();
  }
  getBackground(){
    if(this.toolbarPrincipalService && this.toolbarPrincipalService.logo){
      return `url(${this.toolbarPrincipalService.logo.changingThisBreaksApplicationSecurity})`
    }
  }

  verificaAcesso(modulo:Modulos) {
    return this.controleMenuService.verificaAcessoModulo(modulo);
  }

  getModulos() {
    return Modulos;
  }
}
