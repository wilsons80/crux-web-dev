import { Component, OnInit, Input } from '@angular/core';
import { Familiares } from 'src/app/core/familiares';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';

@Component({
  selector: 'vulnerabilidade',
  templateUrl: './vulnerabilidade.component.html',
  styleUrls: ['./vulnerabilidade.component.css']
})
export class VulnerabilidadeComponent implements OnInit {

  @Input() familiar: Familiares;

  openFormCadastro = true;

  constructor(private familiarAlunoService: FamiliarAlunoService) {
  }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

}
