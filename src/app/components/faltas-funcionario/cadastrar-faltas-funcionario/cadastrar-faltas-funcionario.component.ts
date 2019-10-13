import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { Funcionario } from 'src/app/core/funcionario';
import { FaltasFuncionarioService } from 'src/app/services/faltas-funcionario/faltas-funcionario.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
@Component({
  selector: 'app-cadastrar-faltas-funcionario',
  templateUrl: './cadastrar-faltas-funcionario.component.html',
  styleUrls: ['./cadastrar-faltas-funcionario.component.css']
})
export class CadastrarFaltasFuncionarioComponent implements OnInit {

  funcionarios: Funcionario[];
  faltasFuncionario: FaltasFuncionario = new FaltasFuncionario();

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private faltasFuncionarioService: FaltasFuncionarioService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {

  this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

  if(this.perfilAcesso.insere === 'N'){
    this.mostrarBotaoCadastrar = false;
  }
  
  if(this.perfilAcesso.altera === 'N'){
    this.mostrarBotaoAtualizar = false;
  }
    this.faltasFuncionario.funcionarioFaltou = new Funcionario();
    this.faltasFuncionario.funcionarioCadastrouFalta = new Funcionario();

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });

    let idFaltaFuncionario: number;
    idFaltaFuncionario = this.activatedRoute.snapshot.queryParams.idFaltaFuncionario ? this.activatedRoute.snapshot.queryParams.idFaltaFuncionario : null;
    if (idFaltaFuncionario) {
      this.isAtualizar = true;
      this.faltasFuncionarioService.getById(idFaltaFuncionario).subscribe((faltasFuncionario: FaltasFuncionario) => {
        this.faltasFuncionario = faltasFuncionario;
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
    this.faltasFuncionarioService.cadastrar(this.faltasFuncionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Falta cadastrada com sucesso");
    });
  }

  limpar() {
    this.faltasFuncionario = new FaltasFuncionario()
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.faltasFuncionarioService.alterar(this.faltasFuncionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Falta atualizada com sucesso");
    });

  }

}
