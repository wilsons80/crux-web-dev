import { GrupoModulo } from './../../../core/grupo-modulo';
import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'formulario-grupo-modulo',
  templateUrl: './formulario-grupo-modulo.component.html',
  styleUrls: ['./formulario-grupo-modulo.component.css'],
  viewProviders:  [{ provide:  ControlContainer, useExisting:  NgForm }]
})
export class FormularioGrupoModuloComponent implements OnInit {

  pinDescricao = Date.now();
  pinNome = Date.now();
  pinModulo = Date.now();
  pinPerfilAcesso = Date.now();

  @Input() grupoModulo: GrupoModulo;
  @Input() listaPerfilAcesso: PerfilAcesso[];

  constructor() { }

  ngOnInit() {
  }

  getPerfilAcesso(idPerfilAcesso) {
    this.grupoModulo.perfilAcesso = _.find(this.listaPerfilAcesso, p => p.id === idPerfilAcesso);
  }

}
