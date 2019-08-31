import { UnidadeService } from './../../services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';
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

  displayedColumns: string[] = ['sigla', 'nome', 'unidade', 'acoes'];
  dataSource: MatTableDataSource<Departamento>;

  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  constructor(
    private departamentoService:DepartamentoService,
    ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.departamentoService.getDepartamentosPorUnidade(4).subscribe((departamentos:Departamento[]) => {
      this.departamentos = departamentos
    })

  }

  limpar(){}
  consultar(){
    this.departamentoService.getDepartamentosPorUnidade(4).subscribe((departamentos:Departamento[]) => {
      this.mostrarTabela = true;
      this.dataSource.data = departamentos;
    })
    
  }
}



// idDepartamento: number;
// cdUnidadeDepartamento:string;
// nmDepartamento:string;
// dsEnderecoDepartamento:string;
// nrTelefoneDepartamento:string;
// departamentoSuperior:Departamento;
// unidade:Unidade;