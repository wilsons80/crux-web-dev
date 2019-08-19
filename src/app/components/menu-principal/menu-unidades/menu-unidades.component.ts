import { Component, OnInit } from '@angular/core';
import { Modulos } from 'src/app/core/modulos';

@Component({
  selector: 'menu-unidades',
  templateUrl: './menu-unidades.component.html',
  styleUrls: ['./menu-unidades.component.css']
})
export class MenuUnidadesComponent implements OnInit {

  
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
