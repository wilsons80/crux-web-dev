import { ToastService } from './../../../services/toast/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento/departamento.service';
import { Departamento } from './../../../core/departamento';
import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-departamento',
  templateUrl: './cadastrar-departamento.component.html',
  styleUrls: ['./cadastrar-departamento.component.css']
})
export class CadastrarDepartamentoComponent implements OnInit {

  unidades: Unidade[];
  departamentos: Departamento[];
  departamento: Departamento = new Departamento();

  isAtualizar: boolean = false;

  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private unidadeService: UnidadeService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private location:Location,
    private toastService:ToastService
  ) {
    this.departamento.unidade = new Unidade();
    this.departamento.departamentoSuperior = new Departamento();
  }


  ngOnInit() {
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    })

    this.departamentoService.getAll().subscribe((departamentos:Departamento[]) => {
      this.departamentos = departamentos;
    })

    let idDepartamento: number;
    idDepartamento = this.route.snapshot.queryParams.idDepartamento ? this.route.snapshot.queryParams.idDepartamento : null;
    if (idDepartamento) {
      this.isAtualizar = true;
      this.departamentoService.getDepartamentoById(idDepartamento).subscribe((departamento: Departamento) => {
        this.departamento = departamento
      });
    }

  }
  cadastrar() {
    this.departamentoService.cadastrar(this.departamento).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Departamento cadastrado com sucesso");
    });
  }

  limpar() {
    this.departamento = new Departamento();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar(){
    this.departamentoService.alterar(this.departamento).subscribe(()=>{
      this.location.back();
      this.toastService.showSucesso("Departamento atualizado com sucesso");
    });

  }

}
