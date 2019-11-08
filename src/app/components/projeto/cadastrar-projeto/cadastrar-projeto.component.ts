import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-projeto',
  templateUrl: './cadastrar-projeto.component.html',
  styleUrls: ['./cadastrar-projeto.component.css']
})
export class CadastrarProjetoComponent implements OnInit {

  iniciativas: Iniciativa[];
  programas: Programa[];
  projeto: Projeto;


  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private iniciativaService: IniciativaService,
    private programaService: ProgramaService,
    private projetoService: ProjetoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private toastService: ToastService
  ) {
    
  }


  ngOnInit() {

    this.inicializarObjetos()

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

    this.programaService.getAll().subscribe((programas: Programa[]) => {
      this.programas = programas;
    })

    let idProjeto: number;
    idProjeto = this.activatedRoute.snapshot.queryParams.idProjeto ? this.activatedRoute.snapshot.queryParams.idProjeto : null;
    if (idProjeto) {
      this.isAtualizar = true;
      this.projetoService.getById(idProjeto).subscribe((projeto: Projeto) => {
        this.projeto = projeto
      });
    }

  }
  inicializarObjetos() {
    this.projeto = new Projeto();
    this.projeto.programa = new Programa();
    this.projeto.iniciativa = new Iniciativa();
  }
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.projetoService.cadastrar(this.projeto).subscribe(() => {
      this.router.navigate(['projeto']);
      this.toastService.showSucesso("Projeto cadastrado com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['projeto']);
  }


  atualizar() {
    this.projetoService.alterar(this.projeto).subscribe(() => {
      this.router.navigate(['projeto']);
      this.toastService.showSucesso("Projeto atualizado com sucesso");
    });

  }
}
