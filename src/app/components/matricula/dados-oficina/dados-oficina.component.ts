import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Component, OnInit, Input } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'dados-oficina',
  templateUrl: './dados-oficina.component.html',
  styleUrls: ['./dados-oficina.component.css'],
  viewProviders:  [{ provide:  ControlContainer, useExisting:  NgForm }]
})
export class DadosOficinaComponent implements OnInit {

  @Input() oficina: AtividadeAluno;
  @Input() oficinas: Atividade[];

  pinOficina = Date.now();
  pinDataInicio = Date.now();
  pinDataDesvinculacao = Date.now();
  pinDescricao = Date.now();

  constructor() { }

  ngOnInit() {
  }

}
