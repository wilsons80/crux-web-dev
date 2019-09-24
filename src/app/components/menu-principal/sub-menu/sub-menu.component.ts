import { animateText } from 'src/app/animations/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  animations:[animateText]
})
export class SubMenuComponent implements OnInit {

  @Input() rota: string
  @Input() icone: string
  @Input() titulo: string

  constructor(
    private menuPrincipalService: MenuPrincipalService,
    public _sidenavService: SidenavService
  ) { }

  ngOnInit() {
  }

  fecharMenu() {
    this.menuPrincipalService.alternar();
  }

  getRouterLink() {
    return this.rota;
  }

}
