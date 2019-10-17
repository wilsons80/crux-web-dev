import { SimpleChanges } from '@angular/core';
import { Familiares } from 'src/app/core/familiares';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import { TipoResponsaveis } from 'src/app/core/tipo-responsaveis';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';

@Component({
  selector: 'responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css']
})
export class ResponsavelComponent implements OnInit {

  @Input() familiar: Familiares;

  responsavel: ResponsaveisAluno = new ResponsaveisAluno();
  mensagemResponsavelVigente: string = null;

  openFormCadastro = true;

  constructor(private familiarAlunoService: FamiliarAlunoService) { }

  ngOnInit() {
    this.mostrarResponsavelVigente();
  }

  onGetResponsavel(responsavel) {
    this.responsavel = responsavel;
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

  mostrarResponsavelVigente() {
    if (this.familiar && this.familiar.aluno ) {
      this.familiarAlunoService.getResponsavelVigente(this.familiar.aluno.id).subscribe((responsavel: any) => {

        this.mensagemResponsavelVigente = responsavel.familiar.pessoasFisica.nome +
                                          ' - Início: ' + responsavel.dataVinculacao +
                                          ' - Fim: ' + responsavel.dataDesvinculacao;

      });
    }
  }
}
