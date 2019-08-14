import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../components/login/usuario';
import { Injectable } from '@angular/core';

import { tap, shareReplay } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';

const autenticadorRootPath = 'api/autenticador/';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  constructor(
    private http: HttpClient,
    ) { }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload> jwtDecode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(usuario:Usuario) {
    return this.http.post(autenticadorRootPath + `login`, usuario).pipe(
      tap(response => 
        this.setSession(response)
        ),
      shareReplay(),
    );  
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(autenticadorRootPath + `refresh-token`, { token: this.token })
      .pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }


}
