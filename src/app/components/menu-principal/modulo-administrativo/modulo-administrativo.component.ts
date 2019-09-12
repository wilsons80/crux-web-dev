import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'modulo-administrativo',
  templateUrl: './modulo-administrativo.component.html',
  styleUrls: ['./modulo-administrativo.component.css'],
  animations: [
    trigger('menuState', [
      state('hidden', style({
        visibility: 'hidden',
        opacity: 0
      })),
      state('show',   style({
        visibility: 'visible',
        opacity: 1
      })),
      transition('*=>show', animate('500ms')),
    ])
  ]
})
export class ModuloAdministrativoComponent implements OnInit {

  currentState = "hidden"
  isMostrarSubMenu: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.isMostrarSubMenu = !this.isMostrarSubMenu;
    if(this.isMostrarSubMenu){
      this.currentState = 'show';
    }else
      this.currentState = 'hidden';
  }

}
