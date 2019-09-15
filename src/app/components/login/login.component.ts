import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Login } from 'src/app/core/login';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from './../../core/menu';
import { UsuarioLogado } from './../../core/usuario-logado';
import { AutenticadorService } from './../../services/autenticador/autenticador.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Login = new Login();
  error: any;
  usuarioLogado: UsuarioLogado;

  constructor(
    private autenticadorService: AutenticadorService,
    private menuService: MenuService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.autenticadorService.isLoggedIn) {
      this.router.navigate([`unidade/escolher/`]);
    }
  }

  login() {
    this.autenticadorService.login(this.usuario).pipe(

      switchMap((usuarioLogado: UsuarioLogado) => {
        this.usuarioLogado = usuarioLogado;
        if (usuarioLogado.unidadeLogada) {
          return this.menuService.getMenuPrincipal();
        } else
          return new Observable(obs => obs.next())
      }),


    ).subscribe((menu: Menu[]) => {
      console.log("unidadelogada", this.usuarioLogado);
      if (this.usuarioLogado.unidadeLogada) {

        this.router.navigate(['home']);
      } else {
        this.router.navigate(['unidade/escolher']);
      }
    },
      error => this.error = error
    );
  }

}
