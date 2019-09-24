import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Objetivo } from 'src/app/core/objetivo';
import { Indicadores } from 'src/app/core/indicadores';
import { IndicadoresService } from 'src/app/services/indicadores/indicadores.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Atividade } from 'src/app/core/atividade';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { Projeto } from 'src/app/core/projeto';
import { Unidade } from 'src/app/core/unidade';
import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';

@Component({
  selector: 'app-cadastrar-atividade',
  templateUrl: './cadastrar-atividade.component.html',
  styleUrls: ['./cadastrar-atividade.component.css']
})
export class CadastrarAtividadeComponent implements OnInit {

  atividade: Atividade = new Atividade();

  listaPlanosAcao: PlanosAcao[];
  projetos: Projeto[];
  unidades: Unidade[];

  tipoHorario:any = [
    {id:'F' , descricao:'FIXO' },
    {id:'L' , descricao:'LIVRE' },
  ];

  localExecucao:any = [
    {id:'I' , descricao:'INTERNA' },
    {id:'E' , descricao:'EXTERNA' },
  ];


  isAtualizar: boolean = false;

  constructor(
    private planosAcaoService: PlanosAcaoService,
    private projetoService: ProjetoService,
    private unidadeService: UnidadeService,
    private atividadeService: AtividadeService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
    this.atividade.unidade = new Unidade();
    this.atividade.projeto = new Projeto();
    this.atividade.planosAcao = new PlanosAcao();
  }


  ngOnInit() {
    this.planosAcaoService.getAll().subscribe((planosAcao: PlanosAcao[]) => {
      this.listaPlanosAcao = planosAcao;
    })

    this.projetoService.getAll().subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;

    })
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    })

    let idAtividade: number;
    idAtividade = this.route.snapshot.queryParams.idAtividade ? this.route.snapshot.queryParams.idAtividade : null;
    if (idAtividade) {
      this.isAtualizar = true;
      this.atividadeService.getById(idAtividade).subscribe((atividade: Atividade) => {
        this.atividade = atividade
      });
    }

  }
  cadastrar() {
    this.atividadeService.cadastrar(this.atividade).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Atividade cadastrada com sucesso");
    });
  }

  limpar() {
    this.atividade = new Atividade();
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.atividadeService.alterar(this.atividade).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Atividade atualizada com sucesso");
    });

  }

}
