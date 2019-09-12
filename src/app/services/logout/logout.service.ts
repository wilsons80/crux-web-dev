import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const rootPath = 'api/logout';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }
  
  logout(){
    return this.http.post(rootPath,{});
  }

}
