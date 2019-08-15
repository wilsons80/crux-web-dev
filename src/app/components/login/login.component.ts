import { LoadingPopupService } from './../../services/loadingPopup/loading-popup.service';
import { AutenticadorService } from './../../services/autenticador/autenticador.service';
import { Router } from '@angular/router';

import { Usuario } from './usuario';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario = new Usuario();
  error: any;

  constructor(
    private autenticadorService:AutenticadorService,
    private router:Router,
    private loadingPopupService:LoadingPopupService
    ) { }

  ngOnInit() {
    if(this.autenticadorService.isLoggedIn){
      this.router.navigate(['home']);
    }
  }

  login(usuario: Usuario) {
    this.loadingPopupService.mostrarDialog();
    this.autenticadorService.login(usuario).pipe(
      finalize(()=>  this.loadingPopupService.closeDialog())
    ).subscribe(
      success => this.router.navigate(['home']),
      error => this.error = error
    );
  }

}
