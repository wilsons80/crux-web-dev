import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Usuario } from 'src/app/core/usuario';
import { AutenticadorService } from './../../services/autenticador/autenticador.service';
import { LoadingPopupService } from './../../services/loadingPopup/loading-popup.service';


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
    private unidadeService:UnidadeService
  ) { }

  ngOnInit() {
    if (this.autenticadorService.isLoggedIn) {
      this.router.navigate([`unidade/escolher/`]);
    }
  }

  private setarUnidade(unidades){
    this.unidadeService.unidades = unidades;
    if(this.unidadeService.unidades.length === 1){
      this.unidadeService.unidadeSelecionada = this.unidadeService.unidades[0];
    }
  }

  login() {
    this.loadingPopupService.mostrarDialog();
    this.autenticadorService.login(this.usuario).pipe(
      finalize(() => this.loadingPopupService.closeDialog())
    ).subscribe( (usuario:any) => {
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
