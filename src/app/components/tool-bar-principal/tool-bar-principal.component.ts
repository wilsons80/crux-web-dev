import { LogoutService } from './../../services/logout/logout.service';
import { AcessoUnidade } from './../../core/acesso-unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { MenuPrincipalService } from './../../services/menuPrincipal/menu-principal.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AutenticadorService } from 'src/app/services/autenticador/autenticador.service';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Unidade } from 'src/app/core/unidade';

@Component({
  selector: 'tool-bar-principal',
  templateUrl: './tool-bar-principal.component.html',
  styleUrls: ['./tool-bar-principal.component.css']
})
export class ToolBarPrincipalComponent implements OnInit {

  mostrarMenu = false;
  unidadeSelecionada: any[]

  constructor(
    private authGuard:AuthGuard,
    private autenticadorService:AutenticadorService,
    private router:Router,
    private menuPrincipalService:MenuPrincipalService,
    private unidadeService:UnidadeService,
    private logoutService:LogoutService,
    public toolbarPrincipalService:ToolbarPrincipalService,

    ) { }

  ngOnInit(): void {
    this.authGuard.mostrarMenu.subscribe(resultado => this.mostrarMenu = resultado);
  }

  logout() {
    this.logoutService.logout();
  }

  menuPrincipalToggle(){
    this.menuPrincipalService.alternar();
  }

  mudarUnidade(unidade:AcessoUnidade){
    this.unidadeService.getUnidadePorId(unidade.id).subscribe((unidade:Unidade) => {
      this.router.navigate([`home`]);
    })
  }
}
