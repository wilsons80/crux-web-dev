import { Component, OnInit, Input } from '@angular/core';
import { Modulos } from 'src/app/core/modulos';

@Component({
  selector: 'menu-modulos',
  templateUrl: './menu-modulos.component.html',
  styleUrls: ['./menu-modulos.component.css']
})
export class MenuModulosComponent implements OnInit {

  @Input() modulo:Modulos;
  @Input() icone:String;
  @Input() titulo:String;

  currentState = "hidden";
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
