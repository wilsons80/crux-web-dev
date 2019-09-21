import { Component, OnInit, Input } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';

@Component({
  selector: 'escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.css']
})
export class EscolaridadeComponent implements OnInit {

  @Input() pessoaFisica:PessoaFisica;

  grausInstrucao:GrausInstrucao[];

  formaIngresso:any[] =[
    {tipo: 'CRAS'},
    {tipo: 'DEMANDA ESPONTÂNEA'},
    {tipo: 'SOLICITAÇÃO JUDICIAL'},
    {tipo: 'OUTRO'},
  ];

  tipoEscola:any[] =[
    {id: 'P' ,tipo: 'PÚBLICO'},
    {id: 'R' ,tipo: 'PRIVADO'},
  ];

  nivelEscolaridade:any[] =[
    {id: 'C' ,tipo: 'COMPLETO'},
    {id: 'I' ,tipo: 'CURSANDO'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
