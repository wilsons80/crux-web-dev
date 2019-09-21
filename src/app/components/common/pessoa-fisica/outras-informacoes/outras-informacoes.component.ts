import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'outras-informacoes',
  templateUrl: './outras-informacoes.component.html',
  styleUrls: ['./outras-informacoes.component.css']
})
export class OutrasInformacoesComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica

  constructor() { }

  ngOnInit() {
  }

}
