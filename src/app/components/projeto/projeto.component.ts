import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
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

  projetos: Projeto[];
  projeto: Projeto = new Projeto();

  mostrarTabela = false;

  displayedColumns: string[] = ['nome', 'programa','dataPrevisaoInicio', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<Projeto> = new MatTableDataSource();

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.projetoService.getAll().subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;
    })
  }

  limpar() {
    this.projeto = new Projeto()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.projeto.id) {
      this.projetoService.getById(this.projeto.id).subscribe((projeto: Projeto) => {
        this.dataSource.data = [projeto];
      })
    } else {
      this.projetoService.getAll().subscribe((projeto: Projeto[]) => {
        this.projetos = projeto
        this.dataSource.data = projeto;
      })
    }
    this.mostrarTabela = true;
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

          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}
