import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Unidade } from 'src/app/core/unidade';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Departamento } from './../../core/departamento';
import { DepartamentoService } from './../../services/departamento/departamento.service';

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

  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

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
        console.log("dsadsasd", departamento);
        
        this.departamentoService.excluir(departamento.idDepartamento).subscribe(() => {
          this.ngOnInit();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}

