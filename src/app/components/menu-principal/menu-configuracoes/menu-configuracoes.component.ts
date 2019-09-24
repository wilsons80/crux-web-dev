import { animateText } from './../../../animations/animations';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'menu-configuracoes',
  templateUrl: './menu-configuracoes.component.html',
  styleUrls: ['./menu-configuracoes.component.css'],
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
export class MenuConfiguracoesComponent implements OnInit {

  currentState = "hidden"
  constructor(public _sidenavService: SidenavService) { }

  isMostrarSubMenu: boolean = false;

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
