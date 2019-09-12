import { Component, OnInit } from '@angular/core';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'modulo-pedagogico',
  templateUrl: './modulo-pedagogico.component.html',
  styleUrls: ['./modulo-pedagogico.component.css'],
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
export class ModuloPedagogicoComponent implements OnInit {


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
