import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Iniciativa } from 'src/app/core/iniciativa';
import { Programa } from 'src/app/core/programa';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ActivatedRoute } from '@angular/router';
import { Objetivo } from 'src/app/core/objetivo';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { Projeto } from 'src/app/core/projeto';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-cadastrar-projeto',
  templateUrl: './cadastrar-projeto.component.html',
  styleUrls: ['./cadastrar-projeto.component.css']
})
export class CadastrarProjetoComponent implements OnInit {

  iniciativas: Iniciativa[];
  programas: Programa[];
  funcionarios: any[] = [
    { id: 1, nome: 'Brutos' },
    { id: 2, nome: 'Popeye' }
  ];
  projeto: Projeto = new Projeto();

  isAtualizar: boolean = false;

  constructor(
    private iniciativaService: IniciativaService,
    private programaService: ProgramaService,
    private projetoService: ProjetoService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) { }


  ngOnInit() {
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas;
    })

    this.programaService.getAll().subscribe((programas: Programa[]) => {
      this.programas = programas;
    })

    let idProjeto: number;
    idProjeto = this.route.snapshot.queryParams.idProjeto ? this.route.snapshot.queryParams.idProjeto : null;
    if (idProjeto) {
      this.isAtualizar = true;
      this.projetoService.getById(idProjeto).subscribe((projeto: Projeto) => {
        this.projeto = projeto
      });
    }

  }
  cadastrar() {
    this.projetoService.cadastrar(this.projeto).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Projeto cadastrado com sucesso");
    });
  }

  limpar() {
    this.projeto = new Projeto();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.projetoService.alterar(this.projeto).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Projeto atualizado com sucesso");
    });

  }
}
