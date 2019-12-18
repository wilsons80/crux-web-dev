import { Component, OnInit, Input } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';

@Component({
  selector: 'colaboradores-atividade',
  templateUrl: './colaboradores-atividade.component.html',
  styleUrls: ['./colaboradores-atividade.component.css']
})
export class ColaboradoresAtividadeComponent implements OnInit {

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
