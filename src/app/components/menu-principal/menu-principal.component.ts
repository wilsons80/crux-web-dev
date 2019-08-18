import { ModulosUsuarioService } from '../../services/modulos/modulos-usuario.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
  providers: [ModulosUsuarioService]
})
export class MenuPrincipalComponent implements OnInit {

  constructor(protected modulosUsuarioService:ModulosUsuarioService) { }


  ngOnInit() {
    
  }
  
  

}
