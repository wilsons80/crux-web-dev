import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { UnidadeModule } from './../unidade/unidade.module';
import { MenuPrincipalService } from './../../services/menuPrincipal/menu-principal.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AutenticadorService } from 'src/app/services/autenticador/autenticador.service';

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
    protected unidadeService:UnidadeService
    ) { }

  ngOnInit(): void {
    this.authGuard.mostrarMenu.subscribe(resultado => this.mostrarMenu = resultado);
    if(this.unidadeService.unidades.length === 1){
      this.unidadeSelecionada = this.unidadeService.unidades[0];
    }
  }

  logout(){
    this.autenticadorService.logout();
    this.menuPrincipalService.logout();
    this.router.navigate(['login']);
  }

  menuPrincipalToggle(){
    this.menuPrincipalService.alternar();
  }

}
