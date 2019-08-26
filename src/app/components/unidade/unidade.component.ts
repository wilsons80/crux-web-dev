import { UnidadeService } from './../../services/unidade/unidade.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

  unidades:any[] = [
    {nomeCompleto: 'Josue' , idUnidade: 1}
]

mostrarTabela: boolean = false;

  displayedColumns: string[] = ['usuario', 'modulo', 'perfil', 'acoes'];
  dataSource: MatTableDataSource<any>;
  constructor(
    private unidadeService:UnidadeService
  ) { }

  ngOnInit() {
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades:any) => {
      console.log(unidades);
      this.unidades = unidades;
      
    });
    this.dataSource = new MatTableDataSource();
  }

}
