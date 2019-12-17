import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dados-oficina',
  templateUrl: './dados-oficina.component.html',
  styleUrls: ['./dados-oficina.component.css']
})
export class DadosOficinaComponent implements OnInit {

  @Input() oficina: AtividadeAluno;


  pinDataInicio = Date.now();
  pinDataDesvinculacao = Date.now();
  pinDescricao = Date.now();

  constructor() { }

  ngOnInit() {
  }

}
