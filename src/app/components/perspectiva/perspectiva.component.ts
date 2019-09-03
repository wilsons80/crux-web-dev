import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/core/departamento';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-perspectiva',
  templateUrl: './perspectiva.component.html',
  styleUrls: ['./perspectiva.component.css']
})
export class PerspectivaComponent implements OnInit {

  departamentos: Departamento[];
  mostrarTabela: boolean = false;
  departamento: Departamento = new Departamento();


  displayedColumns: string[] = ['sigla', 'nome', 'unidade', 'acoes'];
  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource();

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    let idUnidadeLogada = this.activatedRoute.snapshot.params.idUnidade;
    this.departamentoService.getDepartamentosPorUnidade(idUnidadeLogada).subscribe((departamentos: Departamento[]) => {
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
      this.dataSource.data = this.departamentos;
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
      pergunta: `Certeza que desse excluir a unidade ${departamento.cdUnidadeDepartamento}?`,
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
