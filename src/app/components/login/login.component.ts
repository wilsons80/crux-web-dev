import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from './usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario = new Usuario();
  error: any;

  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  login(usuario: Usuario) {
    this.authService.login(usuario).subscribe(
      success => this.router.navigate(['home']),
      error => this.error = error
    );
  }

}
