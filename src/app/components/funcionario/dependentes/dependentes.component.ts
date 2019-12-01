import { Component, OnInit, Input } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';

@Component({
  selector: 'dependentes',
  templateUrl: './dependentes.component.html',
  styleUrls: ['./dependentes.component.css']
})
export class DependentesComponent implements OnInit {

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
