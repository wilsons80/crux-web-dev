import { Component, OnInit } from '@angular/core';
import { ColaboradoresProjeto } from 'src/app/core/colaboradores-projeto';
import { Funcionario } from 'src/app/core/funcionario';
import { Programa } from 'src/app/core/programa';
import { Cargo } from 'src/app/core/cargo';
import { ColaboradoresProjetoService } from 'src/app/services/colaboradores-projeto/colaboradores-projeto.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Projeto } from 'src/app/core/projeto';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';

@Component({
  selector: 'app-cadastrar-colaboradores-projeto',
  templateUrl: './cadastrar-colaboradores-projeto.component.html',
  styleUrls: ['./cadastrar-colaboradores-projeto.component.css']
})
export class CadastrarColaboradoresProjetoComponent implements OnInit {

  colaboradoresProjeto: ColaboradoresProjeto = new ColaboradoresProjeto()
  funcionarios: Funcionario[];
  projetos:Projeto[];
  cargos:Cargo[];

  isAtualizar: boolean = false;

  constructor(
    private colaboradoresProjetoService: ColaboradoresProjetoService,
    private funcionarioService: FuncionarioService,
    private projetoService: ProjetoService,
    private cargosService: CargosService,
    private route:ActivatedRoute,
    private router:Router,
    private toastService:ToastService
  ) { }

  ngOnInit() {

    this.colaboradoresProjeto.funcionario = new Funcionario();
    this.colaboradoresProjeto.cargo = new Cargo();
    this.colaboradoresProjeto.projeto = new Projeto();

    this.funcionarioService.getAll().subscribe((funcionarios:Funcionario[]) => {
      this.funcionarios = funcionarios;
    })
    
    this.projetoService.getAll().subscribe((projetos:Projeto[]) => {
      this.projetos = projetos;
    })
    
    this.cargosService.getAll().subscribe((cargos:Cargo[]) => {
      this.cargos = cargos;
    })

    let idColaborador: number;
    idColaborador = this.route.snapshot.queryParams.idColaborador ? this.route.snapshot.queryParams.idColaborador : null;
    if (idColaborador) {
      this.isAtualizar = true;
      this.colaboradoresProjetoService.getById(idColaborador).subscribe((colaboradoresProjeto: ColaboradoresProjeto) => {
        this.colaboradoresProjeto = colaboradoresProjeto
      });
    }

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
  
  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }
  
  atualizar() {
    this.colaboradoresProjetoService.alterar(this.colaboradoresProjeto).subscribe(() => {
      this.router.navigate(['colaboradoresprojeto']);
      this.toastService.showSucesso("Colaborador atualizado com sucesso");
    });

  }

}
