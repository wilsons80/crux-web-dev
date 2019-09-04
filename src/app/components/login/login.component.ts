import { Menu } from './../../core/menu';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Login } from 'src/app/core/login';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { UsuarioLogado } from './../../core/usuario-logado';
import { AutenticadorService } from './../../services/autenticador/autenticador.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Login = new Login();
  error: any;
  usuarioLogado:UsuarioLogado;

  constructor(
    private autenticadorService: AutenticadorService,
    private menuService: MenuService,
    private router: Router,
    private toolbarPrincipalService: ToolbarPrincipalService
  ) { }

  ngOnInit() {
    if (this.autenticadorService.isLoggedIn) {
      this.router.navigate([`unidade/escolher/`]);
    }
  }

  private setarUnidades(unidades) {
    // if (this.toolbarPrincipalService.unidades.length === 1) {
    //   this.toolbarPrincipalService.unidadeSelecionada = this.toolbarPrincipalService.unidades[0];
    // }
  }

  login() {
    this.autenticadorService.login(this.usuario).pipe(
     
      switchMap((usuarioLogado:UsuarioLogado) => {
        this.usuarioLogado = usuarioLogado;
        if(usuarioLogado.unidadeLogada){
          return this.menuService.getMenuPrincipal();
        }else
           return new Observable(obs => obs.next())
      })

    ).subscribe((menu:Menu[]) => {
        //  this.toolbarPrincipalService.unidades = this.usuarioLogado.unidades;

         if(this.usuarioLogado.unidadeLogada){
           //TODO implementar quando o Will resolver o problema com o login do REUL para ver como vou fazer essa aqui da melhor forma.. 
         }else{
          this.router.navigate(['unidade/escolher']);
         }
    },
      error => this.error = error
    );
  }

}
