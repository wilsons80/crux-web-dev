import { Component, OnInit, Input } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';

@Component({
  selector: 'dependentes',
  templateUrl: './dependentes.component.html',
  styleUrls: ['./dependentes.component.css']
})
export class DependentesComponent implements OnInit {

  @Input() funcionario: Funcionario;

  constructor() { }

  ngOnInit() {
  }

}
