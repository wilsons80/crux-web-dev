import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  constructor() { }

  toggle = new EventEmitter();

  alternar(){
    this.toggle.emit();
  }
}
