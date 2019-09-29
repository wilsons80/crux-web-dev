import { Location } from '@angular/common';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { FaltasFuncionarioService } from 'src/app/services/faltas-funcionario/faltas-funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Objetivo } from 'src/app/core/objetivo';
import { Indicadores } from 'src/app/core/indicadores';
@Component({
  selector: 'app-cadastrar-faltas-funcionario',
  templateUrl: './cadastrar-faltas-funcionario.component.html',
  styleUrls: ['./cadastrar-faltas-funcionario.component.css']
})
export class CadastrarFaltasFuncionarioComponent implements OnInit {

  funcionarios: Funcionario[];
  faltasFuncionario: FaltasFuncionario = new FaltasFuncionario();

  isAtualizar: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private faltasFuncionarioService: FaltasFuncionarioService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
  }


  ngOnInit() {
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });

    let idFaltaFuncionario: number;
    idFaltaFuncionario = this.route.snapshot.queryParams.idFaltaFuncionario ? this.route.snapshot.queryParams.idFaltaFuncionario : null;
    if (idFaltaFuncionario) {
      this.isAtualizar = true;
      this.faltasFuncionarioService.getById(idFaltaFuncionario).subscribe((faltasFuncionario: FaltasFuncionario) => {
        this.faltasFuncionario = faltasFuncionario;
      });
    }

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
