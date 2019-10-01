import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { Unidade } from 'src/app/core/unidade';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';

@Component({
  selector: 'academico',
  templateUrl: './academico.component.html',
  styleUrls: ['./academico.component.css']
})
export class AcademicoComponent implements OnInit {

  @Input() aluno: Aluno;

  alunos: Aluno[];
  unidades: Unidade[];

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  constructor(
    private alunoService: AlunoService,
    private unidadeService: UnidadeService,
    ) { }

  ngOnInit() {
    this.aluno.unidade = new Unidade();

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[])=> {
      this.unidades = unidades;
    });
  }

}
