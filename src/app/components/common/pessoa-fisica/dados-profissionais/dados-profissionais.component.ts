import { Component, OnInit, Input } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Component({
  selector: 'dados-profissionais',
  templateUrl: './dados-profissionais.component.html',
  styleUrls: ['./dados-profissionais.component.css']
})
export class DadosProfissionaisComponent implements OnInit {

  @Input() pessoaFisica:PessoaFisica;
  
  situacaoTrabalho:any[] =[
    {tipo: 'CARTEIRA ASSINADA'},
    {tipo: 'SEM CARTEIRA ASSINADA'},
    {tipo: 'AUTÔNOMO'},
    {tipo: 'TRABALHO INFORMAL'},
    {tipo: 'APOSENTADO'},
    {tipo: 'PENSIONISTA'},
    {tipo: 'DESEMPREGRADO'},
    {tipo: 'FUNCIONÁRIO PÚBLICO'},
    {tipo: 'PROFISSIONAL LIBERAL'},
    {tipo: 'OUTROS'},
  ];

  classificadorMotivoNaoTrab:any[] =[
    {id: 'SI' ,descricao: 'NÃO TEM INTERESSE EM TRABALHAR'},
    {id: 'NE' ,descricao: 'PROCUROU, MAS NÃO ENCONTROU EMPRESO'},
    {id: 'ES' ,descricao: 'SOMENTE ESTUDA'},
    {id: 'SM' ,descricao: 'PRESTA SERVIÇO MILITAR'},
    {id: 'PS' ,descricao: 'POR PROBLEMAS DE SAÚDE'},
    {id: 'LA' ,descricao: 'DO LAR'},
    {id: 'OU' ,descricao: 'OUTROS'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
