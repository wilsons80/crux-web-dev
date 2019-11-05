import { ToastService } from './../../../services/toast/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento/departamento.service';
import { Departamento } from './../../../core/departamento';
import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';
import { Location } from '@angular/common';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-departamento',
  templateUrl: './cadastrar-departamento.component.html',
  styleUrls: ['./cadastrar-departamento.component.css']
})
export class CadastrarDepartamentoComponent implements OnInit {

  unidades: Unidade[];
  departamentos: Departamento[];
  departamento: Departamento;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  public maskPhone   = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private unidadeService: UnidadeService,
    private departamentoService: DepartamentoService,
    private activatedRoute: ActivatedRoute,
    private location:Location,
    private toastService:ToastService
  ) {
  }


  ngOnInit() {
    this.inicializarObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    })

    this.departamentoService.getAll().subscribe((departamentos:Departamento[]) => {
      this.departamentos = departamentos;
    })

    let idDepartamento: number;
    idDepartamento = this.activatedRoute.snapshot.queryParams.idDepartamento ? this.activatedRoute.snapshot.queryParams.idDepartamento : null;
    if (idDepartamento) {
      this.isAtualizar = true;
      this.departamentoService.getById(idDepartamento).subscribe((departamento: Departamento) => {
        this.departamento = departamento
      });
    }

  }
  inicializarObjetos() {
    this.departamento = new Departamento();
    this.departamento.unidade = new Unidade();
    this.departamento.departamentoSuperior = new Departamento();
  }

    mostrarBotaoLimpar(){
    	if(this.isAtualizar) return false;
    	if(!this.mostrarBotaoAtualizar) return false;
    	if(!this.mostrarBotaoCadastrar) return false;

    	return true;
  	}
  cadastrar() {
    this.departamentoService.cadastrar(this.departamento).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Departamento cadastrado com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar(){
    this.departamentoService.alterar(this.departamento).subscribe(()=>{
      this.location.back();
      this.toastService.showSucesso("Departamento atualizado com sucesso");
    });

  }

}
