import { Cargo } from 'src/app/core/cargo';
import { CargosService } from './../../../../../services/cargos/cargos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FuncionarioService } from './../../../../../services/funcionario/funcionario.service';
import { Funcionario } from 'src/app/core/funcionario';
import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';
import { ColaboradoresAtividade } from 'src/app/core/colaboradores-atividade';

@Component({
  selector: 'cadastrar-colaboradores-atividade',
  templateUrl: './cadastrar-colaboradores-atividade.component.html',
  styleUrls: ['./cadastrar-colaboradores-atividade.component.css']
})
export class CadastrarColaboradoresAtividadeComponent implements OnInit {

  @Input() colaboradoresAtividade: ColaboradoresAtividade[];

  listaDeFuncionarios: Funcionario[] = [];

  colaboradorAtividade: ColaboradoresAtividade = new ColaboradoresAtividade()
  listaDeCargos: Cargo[];

  isAtualizar: Boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private cargosService: CargosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => this.listaDeFuncionarios = funcionarios);
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.listaDeCargos = cargos)
  }


  zerarCombos() {
    this.colaboradorAtividade = new ColaboradoresAtividade();
    this.colaboradorAtividade.funcionario = null;
    this.colaboradorAtividade.cargo = null;
    this.colaboradorAtividade.dtEntradaAtividade = null;
    this.colaboradorAtividade.dtSaidaAtividade = null;
  }

  adicionar() {
    const funcionarioJaCadastrado = _.find(this.colaboradoresAtividade, (colaboradoresAtividade: ColaboradoresAtividade) => colaboradoresAtividade.funcionario === this.colaboradorAtividade.funcionario);

    if (_.isEmpty(funcionarioJaCadastrado)) {
      const colaboradorAtividade = new ColaboradoresAtividade();
      Object.assign(colaboradorAtividade, this.colaboradorAtividade);
      this.colaboradoresAtividade.push(colaboradorAtividade);
      this.zerarCombos();
    } else {
      this.toastService.showAlerta("Funcionário já está adicionado a lista de colaboradores");
    }
  }

  atualizar() {
    const index = this.colaboradoresAtividade.indexOf(this.colaboradoresAtividade.find(col => col.funcionario.id === this.colaboradorAtividade.funcionario.id));
    this.colaboradoresAtividade.splice(index, 1, this.colaboradorAtividade);
    this.isAtualizar = false;
    this.zerarCombos();
  }

  atualizarColaborador(colaborador: ColaboradoresAtividade) {
    this.isAtualizar = true;
    this.colaboradorAtividade = colaborador;
  }

  cancelar() {
    this.zerarCombos()
  }

}
