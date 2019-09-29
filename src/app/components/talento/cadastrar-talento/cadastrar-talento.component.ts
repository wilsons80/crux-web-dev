import { PessoaFisica } from './../../../core/pessoa-fisica';
import { Location } from '@angular/common';
import { Talento } from 'src/app/core/talento';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { FaltasFuncionarioService } from 'src/app/services/faltas-funcionario/faltas-funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { TalentosService } from 'src/app/services/talentos/talentos.service';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';

@Component({
  selector: 'app-cadastrar-talento',
  templateUrl: './cadastrar-talento.component.html',
  styleUrls: ['./cadastrar-talento.component.css']
})
export class CadastrarTalentoComponent implements OnInit {

  funcionarios: Funcionario[];
  pessoas: PessoaFisica[];
  talento: Talento = new Talento();

  isAtualizar: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private talentosService: TalentosService,
    private pessoaFisicaService: PessoaFisicaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) { }

  ngOnInit() {
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });
    
    this.pessoaFisicaService.getAll().subscribe((pessoas: PessoaFisica[]) => {
      this.pessoas = pessoas;
    });

    let idFaltaFuncionario: number;
    idFaltaFuncionario = this.route.snapshot.queryParams.idFaltaFuncionario ? this.route.snapshot.queryParams.idFaltaFuncionario : null;
    if (idFaltaFuncionario) {
      this.isAtualizar = true;
      this.talentosService.getById(idFaltaFuncionario).subscribe((talento: Talento) => {
        this.talento = talento;
      });
    }

  }
  cadastrar() {
    this.talentosService.cadastrar(this.talento).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Talento cadastrado com sucesso");
    });
  }

  limpar() {
    this.talento = new Talento();
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.talentosService.alterar(this.talento).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Talento atualizado com sucesso");
    });

  }



}
