import { Component, OnInit, Input } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';

@Component({
  selector: 'colaboradores-turma',
  templateUrl: './colaboradores-turma.component.html',
  styleUrls: ['./colaboradores-turma.component.css']
})
export class ColaboradoresTurmaComponent implements OnInit {

  @Input() turma: Turmas;

  openFormCadastro = true;

  constructor() {
  }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }
}
