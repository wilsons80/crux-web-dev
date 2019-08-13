import { Usuario } from './../login/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  usuario:Usuario = new Usuario();
  senhaAtual: String;

  constructor() { }

  ngOnInit() {
  }

  trocarSenha(){}
}
