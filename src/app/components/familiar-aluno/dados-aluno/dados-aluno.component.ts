import { Aluno } from './../../../core/aluno';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dados-aluno',
  templateUrl: './dados-aluno.component.html',
  styleUrls: ['./dados-aluno.component.css']
})
export class DadosAlunoComponent implements OnInit {

  @Input() aluno: Aluno;

  constructor() { }

  ngOnInit() {
  }

}
