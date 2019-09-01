import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Usuario } from 'src/app/core/usuario';
import { AutenticadorService } from './../../services/autenticador/autenticador.service';
import { LoadingPopupService } from './../../services/loadingPopup/loading-popup.service';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  error: any;
  
  constructor(
    private autenticadorService: AutenticadorService,
    private router: Router,
    private loadingPopupService: LoadingPopupService,
    private toolbarPrincipalService:ToolbarPrincipalService
  ) { }

  ngOnInit() {
    if (this.autenticadorService.isLoggedIn) {
      this.router.navigate([`unidade/escolher/`]);
    }
  }

  private setarUnidade(unidades){
    this.toolbarPrincipalService.unidades = unidades;
    if(this.toolbarPrincipalService.unidades.length === 1){
      this.toolbarPrincipalService.unidadeSelecionada = this.toolbarPrincipalService.unidades[0];
    }
  }

  login() {
    this.autenticadorService.login(this.usuario).subscribe( (usuario:any) => {
       this.setarUnidade(usuario.unidades);
      if(usuario.unidades.length === 1) {
        this.router.navigate([`home/${usuario.unidades[0].id}`]);
      }
      
      
      if(usuario.unidades.length > 1) {
        this.router.navigate(['unidade/escolher']);
      }

      },
      error => this.error = error
    );
  }

}
