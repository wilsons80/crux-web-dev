import { TipoEmpresa } from './../../../core/tipo-empresa';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoriaEmpresa } from 'src/app/core/categoria-empresa';
import { Empresa } from 'src/app/core/empresa';
import { MetasService } from 'src/app/services/metas/metas.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Iniciativa } from 'src/app/core/iniciativa';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})
export class CadastrarEmpresaComponent implements OnInit {

  categoriaEmpresa: CategoriaEmpresa;

  categoriasEmpresa: any [] = [
    {id: CategoriaEmpresa.COMERCIAL, descricao: 'COMERCIAL'},
    {id: CategoriaEmpresa.INDUSTRIAS, descricao: 'INDUSTRIAS'},
    {id: CategoriaEmpresa.PRESTADOR_SERVICO, descricao: 'PRESTADOR DE SERVIÇOS'},
    {id: CategoriaEmpresa.OUTRO, descricao: 'OUTRO'},
    
  ];

  
  tiposEmpresa: any [] = [
    {tipo: TipoEmpresa.PARCEIRA, descricao: 'PARCEIRA'},
    {tipo: TipoEmpresa.CONVENIO, descricao: 'CONVÊNIO'},
    {tipo: TipoEmpresa.CONTRATO, descricao: 'CONTRATO'},
    {tipo: TipoEmpresa.FORNECEDOR, descricao: 'FORNECEDOR'},
    {tipo: TipoEmpresa.CLIENTE, descricao: 'CLIENTE'},
    {tipo: TipoEmpresa.OUTRO, descricao: 'OUTRO'}
  ]

  ufs:any[] =[
    {nome: 'DF'}
  ]

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskCNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  empresa: Empresa = new Empresa();

  isAtualizar: boolean = false;

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) { }


  ngOnInit() {
   
    let idEmpresa: number;
    idEmpresa = this.route.snapshot.queryParams.idEmpresa ? this.route.snapshot.queryParams.idEmpresa : null;
    if (idEmpresa) {
      this.isAtualizar = true;
      this.empresaService.getById(idEmpresa).subscribe((empresa: Empresa) => {
        this.empresa = empresa
      });
    }

  }
  cadastrar() {
    this.tratarDados();
    
    this.empresaService.cadastrar(this.empresa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Empresa cadastrada com sucesso");
    });
  }

  
  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

  limpar() {
    this.empresa = new Empresa();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {

    this.tratarDados();

    this.empresaService.alterar(this.empresa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Empresa atualizada com sucesso");
    });

  }

  tratarDados(){
    this.empresa.cep = this.empresa.cep ? this.retiraMascara( this.empresa.cep.toString()) : null 
    this.empresa.cnpj = this.empresa.cnpj ? this.retiraMascara(this.empresa.cnpj) : null 
    this.empresa.telefone = this.empresa.telefone ? this.retiraMascara(this.empresa.telefone) : null 
    this.empresa.ativa = this.empresa.ativa ? 'S' : 'N'
  }

}