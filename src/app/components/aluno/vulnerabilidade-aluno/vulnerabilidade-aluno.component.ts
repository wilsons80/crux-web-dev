import { Aluno } from './../../../core/aluno';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vulnerabilidade-aluno',
  templateUrl: './vulnerabilidade-aluno.component.html',
  styleUrls: ['./vulnerabilidade-aluno.component.css']
})
export class VulnerabilidadeAlunoComponent implements OnInit {

  @Input() aluno: Aluno;

  openFormCadastro = true;

  constructor() {
  }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

}
