import { Component, OnInit, Input } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';
import { Unidade } from 'src/app/core/unidade';
import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { Projeto } from 'src/app/core/projeto';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'dados-atividade',
  templateUrl: './dados-atividade.component.html',
  styleUrls: ['./dados-atividade.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosAtividadeComponent implements OnInit {

  @Input() atividade: Atividade;

  listaPlanosAcao: PlanosAcao[];
  projetos: Projeto[];
  unidades: Unidade[];

  tipoHorario: any = [
    { id: 'F', descricao: 'FIXO' },
    { id: 'L', descricao: 'LIVRE' },
  ];

  localExecucao: any = [
    { id: 'I', descricao: 'INTERNA' },
    { id: 'E', descricao: 'EXTERNA' },
  ];

  constructor(
    private planosAcaoService: PlanosAcaoService,
    private projetoService: ProjetoService,
    private unidadeService: UnidadeService
    ) { }

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


  }

}
