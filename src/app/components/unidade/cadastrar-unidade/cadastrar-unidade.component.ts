import { ArquivoService } from './../../../services/arquivo/arquivo.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { ActivatedRoute } from '@angular/router';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
import { switchMap } from 'rxjs/operators';
import { Funcionario } from 'src/app/core/funcionario';
import { Observable } from 'rxjs';

@Component({
  selector: 'cadastrar-unidade',
  templateUrl: './cadastrar-unidade.component.html',
  styleUrls: ['./cadastrar-unidade.component.css']
})
export class CadastrarUnidadeComponent implements OnInit {

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;
  
  estados: any;

  unidade: Unidade = new Unidade();

  isAtualizar: boolean = false;



  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCNJP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];


  unidades: any[];

  tiposUnidade: any[] = [
    { id: '1' ,tipo: 'M', descricao: 'MATRIZ' },
    { id: '2' ,tipo: 'F', descricao: 'FILIAL' },
  ]

  	// MATRIZ(1, "M"), FILIAL(2, "F");

  situacoesImovel: any[] = [
    { id: '1',tipo:'P', descricao: 'PRÓPRIO' },
    { id: '2',tipo:'C', descricao:'CONCESSÃO' },
    { id: '3',tipo:'L', descricao: 'LICENÇA PRA FUNCIONAMENTO' },
    { id: '4',tipo:'O', descricao: 'OUTRO' }
  ]


  constructor(
    private enderecoService: EnderecoService,
    private activatedRoute: ActivatedRoute,
    private unidadeService: UnidadeService,
    private router: Router,
    private toastService:ToastService,
    private arquivoService:ArquivoService
    
    
  ) { }

  ngOnInit() {

  this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

  if(this.perfilAcesso.insere === 'N'){
    this.mostrarBotaoCadastrar = false;
  }
  
  if(this.perfilAcesso.altera === 'N'){
    this.mostrarBotaoAtualizar = false;
  }
    let idUnidade: number;
    idUnidade = this.activatedRoute.snapshot.queryParams.idUnidade ? this.activatedRoute.snapshot.queryParams.idUnidade : null;
    if (idUnidade) {
      this.isAtualizar = true;
      this.unidadeService.getUnidadePorId(idUnidade).subscribe((unidade: Unidade) => this.unidade = unidade);
    }

    this.enderecoService.getAllEstados().subscribe(estados => {
      this.estados = estados;
    });
  }

  cancelar() {
    this.router.navigate(['unidade'])
    
  }
  atualizar(){
    this.tratarDados();
    this.unidadeService.alterar(this.unidade).pipe(
      switchMap((unidade: Unidade) => {
        if (this.unidade.isFotoChanged && this.unidade.foto) {
          return this.arquivoService.gravarComIdUnidade(this.unidade.foto, unidade.idUnidade)
        } else {
          return new Observable(obs => obs.next());
        }
      })

    ).subscribe(() => {
      this.router.navigate(['unidade'])
      this.toastService.showSucesso('Unidade atualizada com sucesso');
    })

  }

  limpar() {
    this.unidade = new Unidade();
  }

  cadastrar() {
    this.tratarDados();
    this.unidadeService.cadastrar(this.unidade).pipe(
      switchMap((unidade: Unidade) => {
        if (this.unidade.isFotoChanged && this.unidade.foto) {
          return this.arquivoService.gravarComIdUnidade(this.unidade.foto, unidade.idUnidade)
        } else {
          return new Observable(obs => obs.next());
        }
      })

    ).subscribe(() => {
      this.router.navigate(['unidade'])
      this.toastService.showSucesso('Unidade cadastrada com sucesso');
    })
  }

  
  tratarDados() {
    this.unidade.cep = this.unidade.cep ? this.retiraMascara(this.unidade.cep.toString()) : null;
    this.unidade.celular = this.unidade.celular ? this.retiraMascara(this.unidade.celular.toString()) : null;
    this.unidade.telefone = this.unidade.telefone ? this.retiraMascara(this.unidade.telefone.toString()) : null;
    this.unidade.cnpj = this.unidade.cnpj ? this.retiraMascara(this.unidade.cnpj.toString()) : null;
  }

  fileChangeEvent(event: any): void {
    this.unidade.foto = event.target.files[0];
    this.unidade.isFotoChanged = true;
    this.readThis(event.target);
  }

  getBackground(){
    if(this.unidade && this.unidade.urlFoto){
      return `url(${this.unidade.urlFoto})`
    }
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.unidade.urlFoto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }


  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
