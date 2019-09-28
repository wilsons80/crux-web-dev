import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {


  constructor(public http: HttpClient,
              public rootPath: string){
  }

  getAll() {
    return this.http.get(`${this.rootPath}`);
  }

  getById(id: number) {
    return this.http.get(`${this.rootPath}${id}`);
  }

  cadastrar(param: T) {
    return this.http.post(`${this.rootPath}`, param);
  }

  alterar(param: T) {
    return this.http.put(`${this.rootPath}`, param);
  }

  excluir(id: number) {
    return this.http.delete(`${this.rootPath}${id}`);
  }

}
