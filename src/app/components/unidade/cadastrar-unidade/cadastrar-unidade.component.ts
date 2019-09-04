import { Component, OnInit } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { ActivatedRoute } from '@angular/router';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

@Component({
  selector: 'cadastrar-unidade',
  templateUrl: './cadastrar-unidade.component.html',
  styleUrls: ['./cadastrar-unidade.component.css']
})
export class CadastrarUnidadeComponent implements OnInit {


  estados: any;

  unidade: Unidade = new Unidade();
  confirmacaoEmail: string;

  isAtualizar: boolean = false;



  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCNJP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];


  unidades: any[];

  tiposUnidade: any[] = [
    { tipoUnidade: 'MATRIZ' },
    { tipoUnidade: 'FILIAL' },
  ]

  situacoesImovel: any[] = [
    { tipo: 'Próprio' },
    { tipo: 'Concessão' },
    { tipo: 'Licença pra funcionamento' },
    { tipo: 'Outro' }
  ]

  constructor(
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private unidadeService: UnidadeService
  ) { }

  ngOnInit() {
    let idUnidade: number;
    idUnidade = this.route.snapshot.queryParams.idUnidade ? this.route.snapshot.queryParams.idUnidade : null;
    if (idUnidade) {
      this.isAtualizar = true;
      this.unidadeService.getUnidadePorId(idUnidade).subscribe((unidade: Unidade) => this.unidade = unidade);
    }

    this.enderecoService.getAllEstados().subscribe(estados => {
      this.estados = estados;
    });
  }

  cancelar() {
    
  }

  limpar() {
    this.unidade = new Unidade();
    this.confirmacaoEmail = null;
  }


  cadastrar() {
    this.unidade.cep = this.unidade.cep ? this.retiraMascara(this.unidade.cep) : null;
    this.unidade.celular = this.unidade.celular ? this.retiraMascara(this.unidade.celular) : null;
    this.unidade.telefone = this.unidade.telefone ? this.retiraMascara(this.unidade.telefone) : null;

  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

}
