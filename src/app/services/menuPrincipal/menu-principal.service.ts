import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  expandido:boolean = false;

  constructor() { }

  toggle = new EventEmitter();

  alternar(){
    this.toggle.emit();
  }

  logout(){
    this.toggle.emit({logout:true});
  }
}
