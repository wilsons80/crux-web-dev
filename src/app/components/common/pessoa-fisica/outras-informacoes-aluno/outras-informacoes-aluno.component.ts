import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';

@Component({
  selector: 'outras-informacoes-aluno',
  templateUrl: './outras-informacoes-aluno.component.html',
  styleUrls: ['./outras-informacoes-aluno.component.css']
})
export class OutrasInformacoesAlunoComponent implements OnInit {

  @Input() aluno: Aluno;

  constructor() { }

  ngOnInit() {
  }

}
