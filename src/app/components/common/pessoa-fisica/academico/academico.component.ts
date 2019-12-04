import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { Unidade } from 'src/app/core/unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { NiveisTurmasService } from 'src/app/services/niveis-turmas/niveis-turmas.service';
import { NiveisTurmas } from 'src/app/core/niveis-turmas';

@Component({
  selector: 'academico',
  templateUrl: './academico.component.html',
  styleUrls: ['./academico.component.css']
})
export class AcademicoComponent implements OnInit {

  @Input() aluno: Aluno;

  unidades: Unidade[];
  niveisTurmas: NiveisTurmas[];

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  constructor(
    private unidadeService: UnidadeService,
    private niveisTurmasService: NiveisTurmasService
    ) { }

  ngOnInit() {
    this.aluno.unidade = new Unidade();
    this.aluno.nivelTurma = new NiveisTurmas();

    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[])=> {
      this.unidades = unidades;
    });


    this.niveisTurmasService.getAll()
      .subscribe((niveisTurmas: NiveisTurmas[]) => {
        this.niveisTurmas = niveisTurmas;
      });
  }

}
