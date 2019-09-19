import { CondicoesMoradia } from './../../../core/condicoes-moradia';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { Funcionario } from './../../../core/funcionario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent implements OnInit {

  pessoaFisica:PessoaFisica = new PessoaFisica();
  funcionario:Funcionario = new Funcionario();
  ufs:any[] =[
    {nome: 'DF'}
  ]

  sexo:any[] =[
    {tipo: 'M'},
    {tipo: 'F'}
  ]
  
  estadoCivil:any[] =[
    {tipo: 'SOLTEIRO'},
    {tipo: 'CASADO'},
    {tipo: 'UNIÃO ESTÁVEL'},
    {tipo: 'DIVORCIADO'},
    {tipo: 'VIUVO'},
  ]

  condicoesMoradia:CondicoesMoradia[];

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCNJP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor() { 

  }

  ngOnInit() {
    this.funcionario.pessoasFisica = this.pessoaFisica;
  }

}
