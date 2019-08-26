import { Unidade } from './../../../core/unidade';
import { EnderecoService } from './../../../services/endereco/endereco.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastrar-unidade',
  templateUrl: './cadastrar-unidade.component.html',
  styleUrls: ['./cadastrar-unidade.component.css']
})
export class CadastrarUnidadeComponent implements OnInit {


  estados: any;

  unidade:Unidade = new Unidade();
  confirmacaoEmail: string;

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  

  unidades:any[] = [
    {nomeCompleto: 'Josue' , idUnidade: 1}
]
 
  tiposUnidade:any[] = [
    {tipo: 'Matriz'},
    {tipo: 'Filial'},
]

situacoesImovel:any[] = [
  {tipo: 'Próprio'},
  {tipo: 'Concessão'},
  {tipo: 'Licença pra funcionamento'},
  {tipo: 'Outro'},
]

  constructor(
    private enderecoService:EnderecoService,
    private location:Location
    ) { }

  ngOnInit() {
    this.enderecoService.getAllEstados().subscribe(estados => {
      console.log(estados)
      this.estados = estados;
    });
  }

  cancelar(){
      this.location.back();
  }

  limpar(){
    this.unidade = new Unidade();
    this.confirmacaoEmail = null;
  }


  cadastrar(){
       this.unidade.cep = this.unidade.cep ? this.retiraMascara(this.unidade.cep) : null;
      this.unidade.celular = this.unidade.celular ? this.retiraMascara(this.unidade.celular): null;
      this.unidade.telefone = this.unidade.telefone ? this.retiraMascara(this.unidade.telefone) : null;
  
      console.log(this.unidade);
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

}
