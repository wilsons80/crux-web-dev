import { Router } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento/departamento.service';
import { Departamento } from './../../../core/departamento';
import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';

@Component({
  selector: 'app-cadastrar-departamento',
  templateUrl: './cadastrar-departamento.component.html',
  styleUrls: ['./cadastrar-departamento.component.css']
})
export class CadastrarDepartamentoComponent implements OnInit {
  unidades:Unidade[];
  departamentos:Departamento[];
  departamento:Departamento = new Departamento();

  constructor(  
    private unidadeService:UnidadeService,
    private departamentoService:DepartamentoService,
    private router:Router
    ) { }

  ngOnInit() {
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades:Unidade[]) => {
      console.log("unidades", unidades);
      this.unidades = unidades;
  })
  }

  cadastrar(){
    this.departamentoService.cadastrar(this.departamento).subscribe(() => {
      this.router.navigate(['/departamento/4']);
    });
  }

  limpar(){}
  cancelar(){}

  carregarDepartamento(idUnidade){
    this.departamentoService.getDepartamentosPorUnidade(idUnidade).subscribe((departamentos:Departamento[]) => {
      this.departamentos = departamentos;
    });
  }

}
