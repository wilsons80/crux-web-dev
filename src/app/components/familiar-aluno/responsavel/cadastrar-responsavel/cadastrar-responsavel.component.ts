import { Familiares } from './../../../../core/familiares';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import { TipoResponsaveis } from 'src/app/core/tipo-responsaveis';
import { Aluno } from 'src/app/core/aluno';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Component({
  selector: 'cadastrar-responsavel',
  templateUrl: './cadastrar-responsavel.component.html',
  styleUrls: ['./cadastrar-responsavel.component.css']
})
export class CadastrarResponsavelComponent implements OnInit {

  @Input() responsavel: ResponsaveisAluno = new ResponsaveisAluno();
  @Input() familiar: Familiares;

  tipoResponsavel: TipoResponsaveis = new TipoResponsaveis();
  
  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  constructor() {

  }

  ngOnInit() {
    this.responsavel.familiar = new Familiares();
    this.responsavel.aluno = new Aluno();
  }

  adicionar() {
    Object.assign(this.responsavel.familiar, this.familiar);
    Object.assign(this.responsavel.aluno, this.familiar.aluno);

    delete this.responsavel.familiar.responsaveis;

    this.familiar.responsaveis.push(this.responsavel);
    this.limpar();
  }

  limpar() {
    this.responsavel = new ResponsaveisAluno();
  }


  habilitaBotao(formulario): boolean {
    return Object.keys(formulario.controls).length &&
          (formulario.controls.dataVinculacao.value !== undefined ||
           formulario.controls.dataDesvinculacao.value !== undefined ||
           formulario.controls.tipoResponsavel.value !== undefined ||
           formulario.controls.mesmoEnderResponsavel.value !== undefined ||
           formulario.controls.descGrauParentesco.value !== undefined ||
           formulario.controls.descDesligamento.value !== undefined);
  }
}
