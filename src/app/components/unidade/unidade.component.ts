import { Router } from '@angular/router';
import { UnidadeService } from './../../services/unidade/unidade.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Unidade } from 'src/app/core/unidade';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

  unidades:any;

  unidade:Unidade = new Unidade()

  mostrarTabela: boolean = false;

  displayedColumns: string[] = ['sigla', 'nome', 'tipo', 'acoes'];
  dataSource: MatTableDataSource<any>;
  constructor(
    private unidadeService:UnidadeService,
    private router:Router
  ) { }

  ngOnInit() {
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades:any) => {
      this.unidades = unidades;
    });
    this.dataSource = new MatTableDataSource();
  }

  consultar(){
    this.mostrarTabela = true;
    if(this.unidade.idUnidade){
      this.unidadeService.getUnidadePorId(this.unidade.idUnidade).subscribe((unidade:Unidade) => {
        let array = [];
        array.push(unidade);
        this.dataSource.data = array
      })
      
    }else{
      this.dataSource.data = this.unidades;
    }
  }

  limpar(){
    this.mostrarTabela = false;
    this.unidade = new Unidade()
    this.dataSource.data = null;
  }

  atualizar(unidade){
    this.router.navigate(['/unidade/cadastrar'], { queryParams: { idUnidade: unidade.idUnidade} });
  }

}
