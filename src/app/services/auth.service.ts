import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../components/login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor(private route: Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.login === 'teste' && usuario.senha === '1234'){
      this.usuarioAutenticado = true;
      this.route.navigate(['/']);
    }else{
      this.usuarioAutenticado = false;
    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
    


}
