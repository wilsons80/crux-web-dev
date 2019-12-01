import { ProgramaService } from 'src/app/services/programa/programa.service';
import { Projeto } from './../../../../core/projeto';
import { Funcionario } from './../../../../core/funcionario';
import { AlocacaoFuncionario } from './../../../../core/alocacao-funcionario';
import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Programa } from 'src/app/core/programa';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';

@Component({
  selector: 'cadastrar-alocacao',
  templateUrl: './cadastrar-alocacao.component.html',
  styleUrls: ['./cadastrar-alocacao.component.css']
})
export class CadastrarAlocacaoComponent implements OnInit {

  @Input() alocacao: AlocacaoFuncionario = new AlocacaoFuncionario();
  @Input() funcionario: Funcionario;

  tipoAlocacao: string = null;
  programas: Programa[];
  projetos: Projeto[];

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  constructor(private toastService: ToastService,
              private programaService: ProgramaService,
              private projetoService: ProjetoService) {
  }

  ngOnInit() {
    this.initObjetos();

    this.programaService.getAll().subscribe((programas: Programa[]) => {
      this.programas = programas;
    });

    this.projetoService.getAll().subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;
    });

  }

  isPeriodoVigente(): boolean {
    if (this.alocacao.dataInicioVinculacao === null) {
      this.toastService.showAlerta('A data início da vinculação deve ser informada.');
      return false;
    }

    if (this.alocacao.dataFimVinculacao && new Date(this.alocacao.dataFimVinculacao).getTime() < new Date(this.alocacao.dataInicioVinculacao).getTime()) {
      this.toastService.showAlerta('A data início tem quer ser maior que a data de fim.');
      return false;
    }

    return true;
  }

  adicionar() {
    if (!this.isPeriodoVigente()) {
      return ;
    }
    
    Object.assign(this.alocacao.funcionario, this.funcionario);
    delete this.alocacao.funcionario.alocacoesFuncionario;

    this.funcionario.alocacoesFuncionario.push(this.alocacao);
    this.initObjetos();
  }

  initObjetos() {
    this.tipoAlocacao = null;
    this.alocacao = new AlocacaoFuncionario();
    this.alocacao.funcionario = new Funcionario();
    this.alocacao.programa = new Programa();
    this.alocacao.projeto = new Projeto();
  }

  carregarAlocacao(alocacao: AlocacaoFuncionario) {
    this.tipoAlocacao = alocacao.programa || alocacao.projeto ? (alocacao.programa ? 'programa' : 'projeto') : null;
    this.alocacao = alocacao;
  }

  habilitaBotao(formulario): boolean {
    return Object.keys(formulario.controls).length &&
          (!!formulario.controls.dataInicioVinculacao.value &&
           !!formulario.controls.dataFimVinculacao.value &&
           !!formulario.controls.tipoAlocacao.value);
  }
  
  
  isPrograma() {
    return this.tipoAlocacao === 'programa';
  }

}
