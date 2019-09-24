import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Modulos } from './../../core/modulos';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { onSideNavChange, animateText } from 'src/app/animations/animations';


interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
  animations: [onSideNavChange, animateText]
})
export class MenuPrincipalComponent implements OnInit {

  enumModulos = Modulos;

  public sideNavState: boolean = false;
  public linkText: boolean = false;



  constructor(
    private controleMenuService: ControleMenuService,
    private toolbarPrincipalService: ToolbarPrincipalService,
    private menuPrincipalService: MenuPrincipalService,
    public _sidenavService: SidenavService
  ) { }


  ngOnInit() {
    this.menuPrincipalService.toggle.subscribe((resposta) => {
      if (resposta && resposta.logout == true){

      }else
        this.onSinenavToggle();
    });

  }

   // this.menuPrincipalService.toggle.subscribe((resposta) => {
    //   (resposta && resposta.logout == true)
    //     this.close()
    //   } else
    //     this.menuPrincipal.toggle()
    // });

  mostrarMenu(modulo) {
    return this.controleMenuService.acessoModulos[modulo].mostrarMenu;
  }

  fecharMenu() {
    this.menuPrincipalService.alternar();
  }
  getBackground() {
    if (this.toolbarPrincipalService && this.toolbarPrincipalService.logo) {
      return `url(${this.toolbarPrincipalService.logo.changingThisBreaksApplicationSecurity})`
    }
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }
}
