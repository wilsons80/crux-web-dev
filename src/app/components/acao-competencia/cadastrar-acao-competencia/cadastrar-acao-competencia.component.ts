import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Talento } from 'src/app/core/talento';
import { AcoesCompetenciaService } from 'src/app/services/acoes-competencia/acoes-competencia.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AcaoCompetencia } from './../../../core/acao-competencia';
import { TalentosService } from './../../../services/talentos/talentos.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
@Component({
  selector: 'app-cadastrar-acao-competencia',
  templateUrl: './cadastrar-acao-competencia.component.html',
  styleUrls: ['./cadastrar-acao-competencia.component.css']
})
export class CadastrarAcaoCompetenciaComponent implements OnInit {

  talentos: Talento[];
  acaoCompetencia: AcaoCompetencia = new AcaoCompetencia();

  isAtualizar: boolean = false;

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private acoesCompetenciaService: AcoesCompetenciaService,
    private talentoService: TalentosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.insere === 'N'){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(this.perfilAcesso.altera === 'N'){
      this.mostrarBotaoAtualizar = false;
    }

    this.acaoCompetencia.talentosPf = new Talento();
    
    this.talentoService.getAll().subscribe((talentos: Talento[]) => {
      this.talentos = talentos;
    });

    let idAcaoCompetencia: number;
    idAcaoCompetencia = this.activatedRoute.snapshot.queryParams.idAcaoCompetencia ? this.activatedRoute.snapshot.queryParams.idAcaoCompetencia : null;
    if (idAcaoCompetencia) {
      this.isAtualizar = true;
      this.acoesCompetenciaService.getById(idAcaoCompetencia).subscribe((acaoCompetencia: AcaoCompetencia) => {
        this.acaoCompetencia = acaoCompetencia;
      });
    }

  }
  cadastrar() {
    this.acoesCompetenciaService.cadastrar(this.acaoCompetencia).subscribe(() => {
      this.router.navigate(['acaocompetencia'])
      this.toastService.showSucesso("Ação competência cadastrada com sucesso");
    });
  }

  limpar() {
    this.acaoCompetencia = new AcaoCompetencia()
  }

  cancelar() {
    this.router.navigate(['acaocompetencia'])
  }


  atualizar() {
    this.acoesCompetenciaService.alterar(this.acaoCompetencia).subscribe(() => {
      this.router.navigate(['acaocompetencia'])
      this.toastService.showSucesso("Ação competência atualizada com sucesso");
    });
  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}