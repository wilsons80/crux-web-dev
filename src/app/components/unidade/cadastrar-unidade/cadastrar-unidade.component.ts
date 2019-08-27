import { UnidadeService } from './../../../services/unidade/unidade.service';
import { Unidade } from './../../../core/unidade';
import { EnderecoService } from './../../../services/endereco/endereco.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar-unidade',
  templateUrl: './cadastrar-unidade.component.html',
  styleUrls: ['./cadastrar-unidade.component.css']
})
export class CadastrarUnidadeComponent implements OnInit {


  estados: any;

  unidade:Unidade = new Unidade();
  confirmacaoEmail: string;

  isAtualizar: boolean = false;

  

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  

  unidades:any[] = [
    {nomeCompleto: 'Josue' , idUnidade: 1}
]
 
  tiposUnidade:any[] = [
    {tipoUnidade: 'MATRIZ'},
    {tipoUnidade: 'FILIAL'},
]

situacoesImovel:any[] = [
  {tipo: 'Próprio'},
  {tipo: 'Concessão'},
  {tipo: 'Licença pra funcionamento'},
  {tipo: 'Outro'},
]

  constructor(
    private enderecoService:EnderecoService,
    private location:Location,
    private route: ActivatedRoute,
    private unidadeService:UnidadeService
    ) { }

  ngOnInit() {
    let idUnidade: number;
    idUnidade = this.route.snapshot.queryParams.idUnidade ? this.route.snapshot.queryParams.idUnidade : null;
    if(idUnidade){
      this.isAtualizar = true;
      this.unidadeService.getUnidadePorId(idUnidade).subscribe((unidade:Unidade) => this.unidade = unidade);
    }

    this.enderecoService.getAllEstados().subscribe(estados => {
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
  
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

}
