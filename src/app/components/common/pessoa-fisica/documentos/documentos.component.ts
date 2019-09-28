import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DocumentosComponent implements OnInit {


  public mascaraCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,];
    
  ufs:any[] =[
    {nome: 'DF'}
  ]

  @Input() pessoaFisica:PessoaFisica;
  constructor() { }

  ngOnInit() {
  }

}