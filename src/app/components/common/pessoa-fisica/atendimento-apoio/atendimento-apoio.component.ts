import { Component, OnInit, Input } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Component({
  selector: 'atendimento-apoio',
  templateUrl: './atendimento-apoio.component.html',
  styleUrls: ['./atendimento-apoio.component.css']
})
export class AtendimentoApoioComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica;

  formaIngressoEntidade = [ 'CRAS',
                            'DEMANDA ESPONTÂNEA',
                            'SOLICITAÇÃO JUDICIAL',
                            'OUTRO'
                          ];

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
