import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acoes } from './../../../core/acoes';
import { AcoesAtividadeService } from './../../../services/acoes-atividade/acoes-atividade.service';

@Component({
  selector: 'app-cadastrar-acoes-atividade',
  templateUrl: './cadastrar-acoes-atividade.component.html',
  styleUrls: ['./cadastrar-acoes-atividade.component.css']
})
export class CadastrarAcoesAtividadeComponent implements OnInit {

  acoes: Acoes = new Acoes();

  atividades: Atividade[];

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private acoesAtividadeService: AcoesAtividadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private atividadeService: AtividadeService,
  ) {
    this.acoes.atividade = new Atividade();
  }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      console.log("dadsas", atividades);
      this.atividades = atividades;
    })


    let idAcoesAtividade: number;
    idAcoesAtividade = this.activatedRoute.snapshot.queryParams.idAcoesAtividade ? this.activatedRoute.snapshot.queryParams.idAcoesAtividade : null;
    if (idAcoesAtividade) {
      this.isAtualizar = true;
      this.acoesAtividadeService.getById(idAcoesAtividade).subscribe((acoes: Acoes) => {
        this.acoes = acoes
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
    this.acoesAtividadeService.cadastrar(this.acoes).subscribe(() => {
      this.router.navigate(['acoesatividade'])
      this.toastService.showSucesso("Ações atividade cadastrada com sucesso");
    });
  }

  limpar() {
    this.acoes = new Acoes();
  }

  cancelar() {
    this.router.navigate(['acoesatividade'])
  }


  atualizar() {
    this.acoesAtividadeService.alterar(this.acoes).subscribe(() => {
      this.router.navigate(['acoesatividade'])
      this.toastService.showSucesso("Ações atividade atualizada com sucesso");
    });

  }
  
  getNomeAtividade(){
    if(this.atividades)
    return this.atividades.length === 0 ? 'Nenhuma atividade cadastrada' : 'Atividade'
  }

}
