import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/core/cargo';
import { ColaboradoresProjeto } from 'src/app/core/colaboradores-projeto';
import { Funcionario } from 'src/app/core/funcionario';
import { Projeto } from 'src/app/core/projeto';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ColaboradoresProjetoService } from 'src/app/services/colaboradores-projeto/colaboradores-projeto.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-colaboradores-projeto',
  templateUrl: './cadastrar-colaboradores-projeto.component.html',
  styleUrls: ['./cadastrar-colaboradores-projeto.component.css']
})
export class CadastrarColaboradoresProjetoComponent implements OnInit {

  colaboradoresProjeto: ColaboradoresProjeto = new ColaboradoresProjeto()
  funcionarios: Funcionario[];
  projetos: Projeto[];
  cargos: Cargo[];

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private colaboradoresProjetoService: ColaboradoresProjetoService,
    private funcionarioService: FuncionarioService,
    private projetoService: ProjetoService,
    private cargosService: CargosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.colaboradoresProjeto.funcionario = new Funcionario();
    this.colaboradoresProjeto.cargo = new Cargo();
    this.colaboradoresProjeto.projeto = new Projeto();

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    })

    this.projetoService.getAll().subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;
    })

    this.cargosService.getAll().subscribe((cargos: Cargo[]) => {
      this.cargos = cargos;
    })

    let idColaborador: number;
    idColaborador = this.activatedRoute.snapshot.queryParams.idColaborador ? this.activatedRoute.snapshot.queryParams.idColaborador : null;
    if (idColaborador) {
      this.isAtualizar = true;
      this.colaboradoresProjetoService.getById(idColaborador).subscribe((colaboradoresProjeto: ColaboradoresProjeto) => {
        this.colaboradoresProjeto = colaboradoresProjeto
      });
    }

  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.colaboradoresProjetoService.cadastrar(this.colaboradoresProjeto).subscribe(() => {
      this.router.navigate(['colaboradoresprojeto']);
      this.toastService.showSucesso("Colaborador cadastrado com sucesso");
    });
  }

  limpar() {
    this.colaboradoresProjeto = new ColaboradoresProjeto();
  }

  cancelar() {
    this.router.navigate(['colaboradoresprojeto']);
  }


  atualizar() {
    this.colaboradoresProjetoService.alterar(this.colaboradoresProjeto).subscribe(() => {
      this.router.navigate(['colaboradoresprojeto']);
      this.toastService.showSucesso("Colaborador atualizado com sucesso");
    });

  }

}
