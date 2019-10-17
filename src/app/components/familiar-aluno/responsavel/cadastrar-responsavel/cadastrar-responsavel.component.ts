import { Familiares } from './../../../../core/familiares';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import { TipoResponsaveis } from 'src/app/core/tipo-responsaveis';
import { Aluno } from 'src/app/core/aluno';

@Component({
  selector: 'cadastrar-responsavel',
  templateUrl: './cadastrar-responsavel.component.html',
  styleUrls: ['./cadastrar-responsavel.component.css']
})
export class CadastrarResponsavelComponent implements OnInit {

  @Input() responsavel: ResponsaveisAluno;
  @Input() familiar: Familiares;
  @Output() onAtualizarLista = new EventEmitter();

  tipoResponsavel: TipoResponsaveis = new TipoResponsaveis();
  
  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  constructor() { }

  ngOnInit() {
  }

  adicionar() {
    if (this.responsavel.familiar === undefined) {
      this.responsavel.familiar = new Familiares();
    }
    if (this.responsavel.aluno === undefined) {
      this.responsavel.aluno = new Aluno();
    }

    Object.assign(this.responsavel.familiar, this.familiar);
    Object.assign(this.responsavel.aluno, this.familiar.aluno);

    delete this.responsavel.familiar.responsaveis;

    this.familiar.responsaveis.push(this.responsavel);
    this.onAtualizarLista.emit(true);
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
