import { Router } from '@angular/router';
import { AutenticadorService } from 'src/app/services/autenticador/autenticador.service';
import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crux-web-dev';
  
  mostrarMenu = false;

  constructor(
    private authGuard:AuthGuard,
    private autenticadorService:AutenticadorService,
    private router:Router
    ){}

  ngOnInit(): void {
    this.authGuard.mostrarMenu.subscribe(resultado => this.mostrarMenu = resultado);
  }

  logout(){
    this.autenticadorService.logout();
    this.router.navigate(['login']);
  }
}
