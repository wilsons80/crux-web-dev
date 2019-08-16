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

  constructor( 
    private authGuard:AuthGuard,
    private autenticadorService:AutenticadorService,
    private router:Router,
    private menuPrincipalService:MenuPrincipalService
    ) { }

  ngOnInit(): void {
    this.authGuard.mostrarMenu.subscribe(resultado => this.mostrarMenu = resultado);
  }

  logout(){
    this.autenticadorService.logout();
    this.router.navigate(['login']);
  }

  menuPrincipalToggle(){
    this.menuPrincipalService.alternar();
  }

}
