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

  constructor(
    private iniciativaService: IniciativaService,
    private objetivoService: ObjetivoService,
    private programaService: ProgramaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) { }


  ngOnInit() {
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas;
    })

    this.objetivoService.getAll().subscribe((objetivos: Objetivo[]) => {
      this.objetivos = objetivos;
    })

    let idPrograma: number;
    idPrograma = this.route.snapshot.queryParams.idPrograma ? this.route.snapshot.queryParams.idPrograma : null;
    if (idPrograma) {
      this.isAtualizar = true;
      this.programaService.getById(idPrograma).subscribe((programa: Programa) => {
        this.programa = programa
      });
    }

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

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.programaService.alterar(this.programa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Programa atualizado com sucesso");
    });

  }

}
