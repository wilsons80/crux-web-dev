import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Component, OnInit } from '@angular/core';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';

@Component({
  selector: 'sub-menu-departamento',
  templateUrl: './sub-menu-departamento.component.html',
  styleUrls: ['./sub-menu-departamento.component.css']
})
export class SubMenuDepartamentoComponent implements OnInit {

  constructor(
    private menuPrincipalService:MenuPrincipalService,
    private toolbarPrincipalService:ToolbarPrincipalService
  ) { }

  ngOnInit() {
  }

  fecharMenu(){
    this.menuPrincipalService.alternar();
  }

  getRouterLink(){
    let idUnidadeAtualSelecionada: number;
    if(this.toolbarPrincipalService.unidadeSelecionada){
      idUnidadeAtualSelecionada = this.toolbarPrincipalService.unidadeSelecionada.id;
    }
    return `departamento/${idUnidadeAtualSelecionada}`;
  }

}
