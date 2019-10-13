import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { Objetivo } from 'src/app/core/objetivo';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { Programa } from './../../../core/programa';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-programas',
  templateUrl: './cadastrar-programas.component.html',
  styleUrls: ['./cadastrar-programas.component.css']
})
export class CadastrarProgramasComponent implements OnInit {

  iniciativas: Iniciativa[];
  objetivos: Objetivo[];
  funcionarios: any[] = [
    { id: 1, nome: 'Brutos' },
    { id: 2, nome: 'Popeye' }
  ];
  programa: Programa = new Programa();

  isAtualizar: boolean = false;


  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private iniciativaService: IniciativaService,
    private objetivoService: ObjetivoService,
    private programaService: ProgramaService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
    this.programa.iniciativa = new Iniciativa();
    this.programa.objetivo = new Objetivo();
  }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.insere === 'N'){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(this.perfilAcesso.altera === 'N'){
      this.mostrarBotaoAtualizar = false;
    }
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas;
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

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.programaService.cadastrar(this.programa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Programa cadastrado com sucesso");
    });
  }

  limpar() {
    this.programa = new Programa();
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.programaService.alterar(this.programa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Programa atualizado com sucesso");
    });

  }

}
