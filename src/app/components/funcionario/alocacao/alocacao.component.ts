import { Component, OnInit, Input } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';

@Component({
  selector: 'alocacao',
  templateUrl: './alocacao.component.html',
  styleUrls: ['./alocacao.component.css']
})
export class AlocacaoComponent implements OnInit {

  @Input() funcionario: Funcionario;
  
  openFormCadastro = true;

  constructor() { }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

  dateToString(data) {
    if (data) {
      const dataFormate = new Date(data);
      return dataFormate.toLocaleDateString();
    }
    return '';
  }


}
