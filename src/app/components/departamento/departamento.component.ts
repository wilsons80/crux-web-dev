import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Departamento } from './../../core/departamento';
import { DepartamentoService } from './../../services/departamento/departamento.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamentos: Departamento[];
  mostrarTabela: boolean = false;
  departamento: Departamento = new Departamento();

  displayedColumns: string[] = ['sigla', 'nome', 'unidade', 'acoes'];
  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource();

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.departamentoService.getAll().subscribe((departamentos: Departamento[]) => {
      this.departamentos = departamentos
    })
  }

  limpar() {
    this.mostrarTabela = false;
    this.departamento = new Departamento()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.departamento.idDepartamento) {
      this.departamentoService.getDepartamentoById(this.departamento.idDepartamento).subscribe((departamento: Departamento) => {
        let array = [];
        array.push(departamento);
        this.dataSource.data = array
      })
    } else {
      this.departamentoService.getAll().subscribe((departamentos: Departamento[]) => {
        this.departamentos = departamentos
        this.dataSource.data = departamentos;
      })
    }
    this.mostrarTabela = true;
  }


  atualizar(departamento: Departamento) {
    this.router.navigate(['/departamento/cadastrar'], { queryParams: { idDepartamento: departamento.idDepartamento } });
  }

  deletar(departamento: Departamento) {
    this.chamaCaixaDialogo(departamento);
  }

  chamaCaixaDialogo(departamento: Departamento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o departamento ${departamento.cdUnidadeDepartamento}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        
        this.departamentoService.excluir(departamento.idDepartamento).subscribe(() => {
          console.log("voltei");
          
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}

