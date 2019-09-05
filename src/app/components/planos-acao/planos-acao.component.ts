import { Component, OnInit } from '@angular/core';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-planos-acao',
  templateUrl: './planos-acao.component.html',
  styleUrls: ['./planos-acao.component.css']
})
export class PlanosAcaoComponent implements OnInit {

  listaPlanosAcao: PlanosAcao[];
  mostrarTabela: boolean = false;
  planosAcao: PlanosAcao = new PlanosAcao();

  displayedColumns: string[] = ['nome', 'perspectiva', 'usuarioAlteracao', 'acoes'];
  dataSource: MatTableDataSource<PlanosAcao> = new MatTableDataSource();

  constructor(
    private planosAcaoService: PlanosAcaoService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.planosAcaoService.getAll().subscribe((listaPlanosAcao: PlanosAcao[]) => {
      this.listaPlanosAcao = listaPlanosAcao
    })
  }

  limpar() {
    this.mostrarTabela = false;
    this.planosAcao = new PlanosAcao()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.planosAcao.id) {
      this.planosAcaoService.getById(this.planosAcao.id).subscribe((planosAcao: PlanosAcao) => {
        this.dataSource.data = [planosAcao];
      })
    } else {
      this.planosAcaoService.getAll().subscribe((listaPlanosAcao: PlanosAcao[]) => {
        this.listaPlanosAcao = listaPlanosAcao
        this.dataSource.data = listaPlanosAcao;
      })
    }
    this.mostrarTabela = true;
  }


  atualizar(planosAcao: PlanosAcao) {
    this.router.navigate(['/planosacao/cadastrar'], { queryParams: { idplanosAcao: planosAcao.id} });
  }

  deletar(planosAcao: PlanosAcao) {
    this.chamaCaixaDialogo(planosAcao);
  }

  chamaCaixaDialogo(planosAcao: PlanosAcao) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o departamento ${planosAcao.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        
        this.planosAcaoService.excluir(planosAcao.id).subscribe(() => {
          
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }
}
