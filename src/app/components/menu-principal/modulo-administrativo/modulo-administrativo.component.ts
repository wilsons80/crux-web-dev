import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidenavService } from 'src/app/services/sidenav.service';
import { animateText } from 'src/app/animations/animations';

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
    ]), animateText
  ]
})
export class ModuloAdministrativoComponent implements OnInit {

  currentState = "hidden"
  isMostrarSubMenu: boolean = false;

  
  
  constructor(public _sidenavService: SidenavService) { }

  ngOnInit() {
  }

  toggle(){
    this.isMostrarSubMenu = !this.isMostrarSubMenu;
    if(this.isMostrarSubMenu){
      this.currentState = 'show';
    }else
      this.currentState = 'hidden';
  }
  getIcone(){
    return this.isMostrarSubMenu ? "expand_more" : "chevron_right";
  }

}
