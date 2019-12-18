import { Component, OnInit, Input } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';

@Component({
  selector: 'materiais-oficina',
  templateUrl: './materiais-oficina.component.html',
  styleUrls: ['./materiais-oficina.component.css']
})
export class MateriaisOficinaComponent implements OnInit {

  @Input() oficina: Atividade;

  openFormCadastro = false;

  constructor() {
  }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

}
