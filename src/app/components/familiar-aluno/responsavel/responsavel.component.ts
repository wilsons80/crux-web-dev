import { SimpleChanges } from '@angular/core';
import { Familiares } from 'src/app/core/familiares';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import { TipoResponsaveis } from 'src/app/core/tipo-responsaveis';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css']
})
export class ResponsavelComponent implements OnInit {

  @Input() familiar: Familiares;
  @ViewChild('listaResponsaveis', { static: true }) listaResponsaveis: any;


  responsavel: ResponsaveisAluno = new ResponsaveisAluno();
  openFormCadastro: false;
  
  constructor() { }

  ngOnInit() {
  }

  onGetResponsavel(responsavel) {
    this.responsavel = responsavel;
  }

  onOpenFormCadastro(evento) {
     this.openFormCadastro = evento;
  }

  onAtualizarLista(evento) {
    this.listaResponsaveis.carregarListaResponsaveis();
  }
}
