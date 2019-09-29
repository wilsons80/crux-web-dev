import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Talento } from 'src/app/core/talento';
import { AcoesCompetenciaService } from 'src/app/services/acoes-competencia/acoes-competencia.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AcaoCompetencia } from './../../../core/acao-competencia';
import { TalentosService } from './../../../services/talentos/talentos.service';
@Component({
  selector: 'app-cadastrar-acao-competencia',
  templateUrl: './cadastrar-acao-competencia.component.html',
  styleUrls: ['./cadastrar-acao-competencia.component.css']
})
export class CadastrarAcaoCompetenciaComponent implements OnInit {

  talentos: Talento[];
  acaoCompetencia: AcaoCompetencia = new AcaoCompetencia();

  isAtualizar: boolean = false;

  constructor(
    private acoesCompetenciaService: AcoesCompetenciaService,
    private talentoService: TalentosService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {
    this.talentoService.getAll().subscribe((talentos: Talento[]) => {
      this.talentos = talentos;
    });

    let idAcaoCompetencia: number;
    idAcaoCompetencia = this.route.snapshot.queryParams.idAcaoCompetencia ? this.route.snapshot.queryParams.idAcaoCompetencia : null;
    if (idAcaoCompetencia) {
      this.isAtualizar = true;
      this.acoesCompetenciaService.getById(idAcaoCompetencia).subscribe((acaoCompetencia: AcaoCompetencia) => {
        this.acaoCompetencia = acaoCompetencia;
      });
    }

  }
  cadastrar() {
    this.acoesCompetenciaService.cadastrar(this.acaoCompetencia).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Ação competência cadastrada com sucesso");
    });
  }

  limpar() {
    this.acaoCompetencia = new AcaoCompetencia()
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.acoesCompetenciaService.alterar(this.acaoCompetencia).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Ação competência atualizada com sucesso");
    });
  }
}