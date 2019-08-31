import { DepartamentoService } from './../../services/departamento/departamento.service';
import { Departamento } from './../../core/departamento';
import { ConsultarCursoComponent } from './../curso/consultar-curso/consultar-curso.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamentos: Departamento[];

  mostrarTabela: boolean = false;

  displayedColumns: string[] = ['sigla', 'nome', 'departamentoSuperior', 'unidade', 'acoes'];
  dataSource: MatTableDataSource<Departamento>;

  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  constructor(
    private departamentoService:DepartamentoService
    ) {}

  ngOnInit() {
    this.departamentoService.getDepartamentosPorUnidade(4).subscribe((departamentos:Departamento[]) => {
      console.log("departamentos", departamentos);
      this.departamentos = departamentos
    })
  }

  limpar(){}
  consultar(){}
}



// idDepartamento: number;
// cdUnidadeDepartamento:string;
// nmDepartamento:string;
// dsEnderecoDepartamento:string;
// nrTelefoneDepartamento:string;
// departamentoSuperior:Departamento;
// unidade:Unidade;