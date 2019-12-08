import { Component, OnInit, Input } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';
import { Atividade } from 'src/app/core/atividade';
import { Unidade } from 'src/app/core/unidade';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { Projeto } from 'src/app/core/projeto';

@Component({
  selector: 'cadastrar-oficinas',
  templateUrl: './cadastrar-oficinas.component.html',
  styleUrls: ['./cadastrar-oficinas.component.css']
})
export class CadastrarOficinasComponent implements OnInit {
  
  @Input() turma: Turmas;
  oficina: Atividade = new Atividade();

  isAtualizar = false;
  constructor() { }
  
  ngOnInit(): void {
    this.oficina.unidade = new Unidade();
    this.oficina.planosAcao = new PlanosAcao();
    this.oficina.projeto = new Projeto();
  }


  atualizarOficina(oficina: Atividade) {
    this.isAtualizar = true;
    this.oficina = oficina;
  }

}
