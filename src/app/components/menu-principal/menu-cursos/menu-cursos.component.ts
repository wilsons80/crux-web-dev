import { Component, OnInit } from '@angular/core';
import { Modulos } from 'src/app/core/modulos';

@Component({
  selector: 'menu-cursos',
  templateUrl: './menu-cursos.component.html',
  styleUrls: ['./menu-cursos.component.css']
})
export class MenuCursosComponent implements OnInit {

  currentState = "hidden";
  isMostrarSubMenu: boolean = false;
  modulo = Modulos.CURSOS;

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
