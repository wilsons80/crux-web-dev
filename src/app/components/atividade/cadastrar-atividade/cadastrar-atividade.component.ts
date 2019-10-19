import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { Projeto } from 'src/app/core/projeto';
import { Unidade } from 'src/app/core/unidade';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

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

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  tipoHorario: any = [
    { id: 'F', descricao: 'FIXO' },
    { id: 'L', descricao: 'LIVRE' },
  ];

  localExecucao: any = [
    { id: 'I', descricao: 'INTERNA' },
    { id: 'E', descricao: 'EXTERNA' },
  ];


  isAtualizar: boolean = false;

  constructor(
    private planosAcaoService: PlanosAcaoService,
    private projetoService: ProjetoService,
    private unidadeService: UnidadeService,
    private atividadeService: AtividadeService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
    this.atividade.unidade = new Unidade();
    this.atividade.projeto = new Projeto();
    this.atividade.planosAcao = new PlanosAcao();
  }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
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
    idAtividade = this.activatedRoute.snapshot.queryParams.idAtividade ? this.activatedRoute.snapshot.queryParams.idAtividade : null;
    if (idAtividade) {
      this.isAtualizar = true;
      this.atividadeService.getById(idAtividade).subscribe((atividade: Atividade) => {
        this.atividade = atividade
      });
    }

  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.atividadeService.cadastrar(this.atividade).subscribe(() => {
      this.router.navigate(['atividade'])
      this.toastService.showSucesso("Atividade cadastrada com sucesso");
    });
  }

  limpar() {
    this.atividade = new Atividade();
  }

  cancelar() {
    this.router.navigate(['atividade'])
  }


  atualizar() {
    this.atividadeService.alterar(this.atividade).subscribe(() => {
      this.router.navigate(['atividade'])
      this.toastService.showSucesso("Atividade atualizada com sucesso");
    });

  }

}
