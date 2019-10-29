import { Component, OnInit, Input } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';
import { ColaboradoresAtividade } from 'src/app/core/colaboradores-atividade';

@Component({
  selector: 'colaboradores-atividade',
  templateUrl: './colaboradores-atividade.component.html',
  styleUrls: ['./colaboradores-atividade.component.css']
})
export class ColaboradoresAtividadeComponent implements OnInit {

  @Input() colaboradoresAtividade:ColaboradoresAtividade [];
  
  

  openFormCadastro = true;

  constructor() {
  }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

  

}
