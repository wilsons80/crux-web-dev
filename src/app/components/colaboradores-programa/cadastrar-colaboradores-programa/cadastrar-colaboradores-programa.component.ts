import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Programa } from './../../../core/programa';
import { ColaboradoresPrograma } from './../../../core/colaboradores-programa';
import { ProgramaService } from './../../../services/programa/programa.service';
import { FuncionarioService } from './../../../services/funcionario/funcionario.service';
import { ColaboradoresProgramaService } from './../../../services/colaboradores-programa/colaboradores-programa.service';
import { Component, OnInit } from '@angular/core';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { Funcionario } from 'src/app/core/funcionario';
import { Cargo } from 'src/app/core/cargo';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-colaboradores-programa',
  templateUrl: './cadastrar-colaboradores-programa.component.html',
  styleUrls: ['./cadastrar-colaboradores-programa.component.css']
})
export class CadastrarColaboradoresProgramaComponent implements OnInit {

  colaboradoresPrograma: ColaboradoresPrograma = new ColaboradoresPrograma()
  funcionarios: Funcionario[];
  programas:Programa[];
  cargos:Cargo[];

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private colaboradoresProgramaService: ColaboradoresProgramaService,
    private funcionarioService: FuncionarioService,
    private programaService: ProgramaService,
    private cargosService: CargosService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastService:ToastService
  ) { }

  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }


    this.colaboradoresPrograma.funcionario = new Funcionario();
    this.colaboradoresPrograma.cargo = new Cargo();
    this.colaboradoresPrograma.programa = new Programa();

    this.funcionarioService.getAll().subscribe((funcionarios:Funcionario[]) => {
      this.funcionarios = funcionarios;
    })
    
    this.programaService.getAll().subscribe((programas:Programa[]) => {
      this.programas = programas;
    })
    
    this.cargosService.getAll().subscribe((cargos:Cargo[]) => {
      this.cargos = cargos;
    })

    let idColaborador: number;
    idColaborador = this.activatedRoute.snapshot.queryParams.idColaborador ? this.activatedRoute.snapshot.queryParams.idColaborador : null;
    if (idColaborador) {
      this.isAtualizar = true;
      this.colaboradoresProgramaService.getById(idColaborador).subscribe((colaboradoresPrograma: ColaboradoresPrograma) => {
        this.colaboradoresPrograma = colaboradoresPrograma
      });
    }

  }
  cadastrar() {
    this.colaboradoresProgramaService.cadastrar(this.colaboradoresPrograma).subscribe(() => {
      this.router.navigate(['colaboradoresprograma']);
      this.toastService.showSucesso("Colaborador cadastrado com sucesso");
    });
  }
  
  limpar() {
    this.colaboradoresPrograma = new ColaboradoresPrograma();
  }
  
  cancelar() {
    this.router.navigate(['colaboradoresprograma']);
  }
  
  atualizar() {
    this.colaboradoresProgramaService.alterar(this.colaboradoresPrograma).subscribe(() => {
      this.router.navigate(['colaboradoresprograma']);
      this.toastService.showSucesso("Colaborador atualizado com sucesso");
    });

  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
