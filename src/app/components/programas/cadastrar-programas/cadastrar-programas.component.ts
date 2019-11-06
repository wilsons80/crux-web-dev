import { FuncionarioService } from './../../../services/funcionario/funcionario.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { Objetivo } from 'src/app/core/objetivo';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { Programa } from './../../../core/programa';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';
import { Funcionario } from 'src/app/core/funcionario';
import * as _ from 'lodash';

@Component({
  selector: 'app-cadastrar-programas',
  templateUrl: './cadastrar-programas.component.html',
  styleUrls: ['./cadastrar-programas.component.css']
})
export class CadastrarProgramasComponent implements OnInit {

  iniciativas: Iniciativa[];
  objetivos: Objetivo[];
  funcionarios: Funcionario[];
  programa: Programa;

  isAtualizar: boolean = false;


  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  funcionario:Funcionario = new Funcionario();

  constructor(
    private iniciativaService: IniciativaService,
    private objetivoService: ObjetivoService,
    private programaService: ProgramaService,
    private funcionarioService: FuncionarioService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
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
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas;
    })
   
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    })

    this.objetivoService.getAll().subscribe((objetivos: Objetivo[]) => {
      this.objetivos = objetivos;
    })

    let idPrograma: number;
    idPrograma = this.activatedRoute.snapshot.queryParams.idPrograma ? this.activatedRoute.snapshot.queryParams.idPrograma : null;
    if (idPrograma) {
      this.isAtualizar = true;
      this.programaService.getById(idPrograma).subscribe((programa: Programa) => {
        this.programa = programa
      });
    }

  }
  inicializarObjetos() {
    this.programa = new Programa();
    this.programa.iniciativa = new Iniciativa();
    this.programa.objetivo = new Objetivo();
    
  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.programaService.cadastrar(this.programa).subscribe(() => {
      this.router.navigate(['programas']);
      this.toastService.showSucesso("Programa cadastrado com sucesso");
    });
  }

  limpar() {
   this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['programas']);
  }


  atualizar() {
    this.programaService.alterar(this.programa).subscribe(() => {
      this.router.navigate(['programas']);
      this.toastService.showSucesso("Programa atualizado com sucesso");
    });

  }

  mostrarDadosFuncionario(idFuncionario:number) {
     this.funcionario = _.cloneDeep(_.find(this.funcionarios, (f: Funcionario) => f.id === idFuncionario));
  }

}
