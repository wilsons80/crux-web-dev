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
    private loadingPopupService: LoadingPopupService
  ) { }

  ngOnInit() {
    if (this.autenticadorService.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  login() {
    this.loadingPopupService.mostrarDialog();
    this.autenticadorService.login(this.usuario).pipe(
      finalize(() => this.loadingPopupService.closeDialog())
    ).subscribe(
      success => this.router.navigate(['home']),
      error => this.error = error
    );
  }

}
