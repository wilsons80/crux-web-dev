import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { FaltasFuncionarioService } from 'src/app/services/faltas-funcionario/faltas-funcionario.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { Funcionario } from 'src/app/core/funcionario';

@Component({
  selector: 'app-faltas-funcionario',
  templateUrl: './faltas-funcionario.component.html',
  styleUrls: ['./faltas-funcionario.component.css']
})
export class FaltasFuncionarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaFaltasFuncionario: FaltasFuncionario[];
  listaFuncionarios: Funcionario[];
  mostrarTabela: boolean = false;
  faltasFuncionario: FaltasFuncionario = new FaltasFuncionario();
  msg:string;
  funcionario: Funcionario = new Funcionario();

  displayedColumns: string[] = ['descricao', 'acoes'];
  dataSource: MatTableDataSource<FaltasFuncionario> = new MatTableDataSource();

  constructor(
    private faltasFuncionarioService: FaltasFuncionarioService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.funcionarioService.getAll().subscribe((funcionarios:Funcionario[]) => {
      this.listaFuncionarios = funcionarios;
    })
    
  }
 

  limpar() {
    this.mostrarTabela = false;
    this.faltasFuncionario = new FaltasFuncionario()
    this.dataSource.data = [];
  }

  consultar() {
      this.faltasFuncionarioService.getPorFuncionario(this.funcionario.id).subscribe((faltasFuncionario: FaltasFuncionario) => {
        if(!faltasFuncionario){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [faltasFuncionario];
          this.mostrarTabela = true;
        }
      })
    
  }


  atualizar(faltasFuncionario: FaltasFuncionario) {
    this.router.navigate(['/faltasfuncionario/cadastrar'], { queryParams: { idFaltasFuncionario: faltasFuncionario.id } });
  }

  deletar(faltasFuncionario: FaltasFuncionario) {
    this.chamaCaixaDialogo(faltasFuncionario);
  }

  chamaCaixaDialogo(faltasFuncionario: FaltasFuncionario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a falta do funcionario?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.faltasFuncionarioService.excluir(faltasFuncionario.id).subscribe(() => {
          this.faltasFuncionario.id = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }


}
