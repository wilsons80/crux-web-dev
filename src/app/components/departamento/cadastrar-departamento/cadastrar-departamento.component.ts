import { Departamento } from './../../../core/departamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-departamento',
  templateUrl: './cadastrar-departamento.component.html',
  styleUrls: ['./cadastrar-departamento.component.css']
})
export class CadastrarDepartamentoComponent implements OnInit {

  departamento:Departamento = new Departamento();
  departamentos = [
    {idDepartamento: 1, nomeDepartamento: 'Departamento 1'}
  ]

  constructor() { }

  ngOnInit() {
  }

  cadastrar(){}
  limpar(){}
  cancelar(){}

}
