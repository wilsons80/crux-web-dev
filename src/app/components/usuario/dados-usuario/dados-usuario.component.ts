import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosUsuarioComponent implements OnInit {

  @Input() usuario: UsuarioSistema = new UsuarioSistema();
  hide = true;

  constructor() { }

  ngOnInit() {
  }

}
