import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';
import { ControlContainer, NgForm } from '@angular/forms';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'dados-oficina',
  templateUrl: './dados-oficina.component.html',
  styleUrls: ['./dados-oficina.component.css'],
  viewProviders:  [{ provide:  ControlContainer, useExisting:  NgForm }]
})
export class DadosOficinaComponent implements OnInit {

  @Input() oficina: AtividadeAluno;
  @Input() oficinas: Atividade[];
  @Input() perfilAcesso: Acesso;
  @Output() onDeletar = new EventEmitter();

  pinOficina = Date.now();
  pinDataInicio = Date.now();
  pinDataDesvinculacao = Date.now();
  pinDescricao = Date.now();

  constructor() { }

  ngOnInit() {
  }

  deletar(oficina: AtividadeAluno) {
    this.onDeletar.emit(oficina);
  }
}
