import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Projeto } from 'src/app/core/projeto';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  projetos: Projeto[];
  projeto: Projeto = new Projeto();
  msg:string;

  mostrarTabela = false;

  displayedColumns: string[] = ['nome', 'programa','dataPrevisaoInicio', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<Projeto> = new MatTableDataSource();

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
  limpar() {
    this.mostrarTabela = false;
    this.projeto = new Projeto()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.projeto.id) {
      this.projetoService.getById(this.projeto.id).subscribe((projeto: Projeto) => {
        if(!projeto){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [projeto];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(projeto: Projeto) {
    this.router.navigate(['/projeto/cadastrar'], { queryParams: { idProjeto: projeto.id } });
  }

  deletar(projeto: Projeto) {
    this.chamaCaixaDialogo(projeto);
  }

  chamaCaixaDialogo(projeto: Projeto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o projeto ${projeto.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.projetoService.excluir(projeto.id).subscribe(() => {
          this.projeto.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.projetoService.getAll().subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;
      this.dataSource.data = projetos ? projetos : [];
      this.verificaMostrarTabela(projetos);
    })
  }
  verificaMostrarTabela(projetos: Projeto[]) {
    if(!projetos ||projetos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum projeto cadastrado."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
