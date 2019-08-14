import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/components/login/usuario';
import { Observable } from 'rxjs';

const autenticacaoRootPath = 'api/autenticacao/';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(autenticacaoRootPath + `login`, usuario);
  }

  refreshToken(token: String): Observable<any> {
    return this.http.post(autenticacaoRootPath + `refresh-token`, { token: token });
  }

}
