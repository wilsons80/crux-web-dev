import { CondicoesMoradiaService } from './../../../../services/condicoes-moradia/condicoes-moradia.service';
import { PessoaFisica } from './../../../../core/pessoa-fisica';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosPessoaisComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica = new PessoaFisica();

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  ufs:any[] =[
    {nome: 'DF'}
  ]
  
  estadoCivil:any[] =[
    {tipo: 'SOLTEIRO'},
    {tipo: 'CASADO'},
    {tipo: 'UNIÃO ESTÁVEL'},
    {tipo: 'DIVORCIADO'},
    {tipo: 'VIÚVO'}
  ]

  sexo:any[] =[
    {tipo: 'M'},
    {tipo: 'F'}
  ]
  
  condicoesMoradia:CondicoesMoradia[];
  
  tipoEscola:any[] =[
    {id: 'P' ,tipo: 'PÚBLICO'},
    {id: 'R' ,tipo: 'PRIVADO'},
  ]
 
  nivelEscolaridade:any[] =[
    {id: 'C' ,tipo: 'COMPLETO'},
    {id: 'I' ,tipo: 'CURSANDO'},
  ]

  
  constructor(
    private condicoesMoradiaService:CondicoesMoradiaService
  ) { }

  ngOnInit() {
    this.condicoesMoradiaService.getAll().subscribe((condicoesMoradia:CondicoesMoradia[])=> {
      this.condicoesMoradia = condicoesMoradia;
    })
  }

}