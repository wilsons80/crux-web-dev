import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { FaltasFuncionarioService } from 'src/app/services/faltas-funcionario/faltas-funcionario.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-faltas-funcionario',
  templateUrl: './faltas-funcionario.component.html',
  styleUrls: ['./faltas-funcionario.component.css']
})
export class FaltasFuncionarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaFaltasFuncionario: FaltasFuncionario[];
  mostrarTabela: boolean = false;
  faltasFuncionario: FaltasFuncionario = new FaltasFuncionario();
  msg:string;

  displayedColumns: string[] = ['descricao', 'acoes'];
  dataSource: MatTableDataSource<FaltasFuncionario> = new MatTableDataSource();

  constructor(
    private faltasFuncionarioService: FaltasFuncionarioService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
    
  }
 

  limpar() {
    this.mostrarTabela = false;
    this.faltasFuncionario = new FaltasFuncionario()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.faltasFuncionario.id) {
      this.faltasFuncionarioService.getById(this.faltasFuncionario.id).subscribe((faltasFuncionario: FaltasFuncionario) => {
        if(!faltasFuncionario){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [faltasFuncionario];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
    
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

  getAll() {
    this.faltasFuncionarioService.getAll().subscribe((listaFaltasFuncionario: FaltasFuncionario[]) => {
      this.listaFaltasFuncionario = listaFaltasFuncionario;
      this.dataSource.data = listaFaltasFuncionario ? listaFaltasFuncionario : [];
      this.verificaMostrarTabela(listaFaltasFuncionario);
    })
  }
  verificaMostrarTabela(faltasFuncionarios: FaltasFuncionario[]) {
    if(!faltasFuncionarios || faltasFuncionarios.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhuma falta cadastrada."
    }else{
      this.mostrarTabela = true; 
    }
  }

}
