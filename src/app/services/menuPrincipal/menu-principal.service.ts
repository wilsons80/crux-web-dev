import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  expandido:boolean = false;

  fotoPerfil:any;

  constructor() { }

  toggle = new EventEmitter();

  alternar(){
    this.toggle.emit();
  }

  logout(){
    this.toggle.emit({logout:true});
  }
}
