import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Iniciativa } from 'src/app/core/iniciativa';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Produto } from 'src/app/core/produto';
import { ProdutoService } from 'src/app/services/produto/produto.service';

@Component({
  selector: 'produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  produtos: Produto[];
  mostrarTabela: boolean = false;
  produto: Produto = new Produto();
  msg:string;


  displayedColumns: string[] = ['nome', 'codigoUnidadeMedida', 'nomeProdutoNotafiscal', 'acoes'];


  dataSource: MatTableDataSource<Produto> = new MatTableDataSource();

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
 

  limpar() {
    this.mostrarTabela = false;
    this.produto = new Produto()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.produto.id) {
      this.produtoService.getById(this.produto.id).subscribe((produto: Produto) => {
        if(!produto){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [produto];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(produto: Produto) {
    this.router.navigate(['/produto/cadastrar'], { queryParams: { idProduto: produto.id } });
  }

  deletar(produto: Produto) {
    this.chamaCaixaDialogo(produto);
  }

  chamaCaixaDialogo(produto: Produto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a iniciativa ${produto.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.produtoService.excluir(produto.id).subscribe(() => {
          this.produto.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.produtoService.getAll().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
      this.dataSource.data = produtos ? produtos : [];
      this.verificaMostrarTabela(produtos);
    })
  }

  verificaMostrarTabela(produtos: Produto[]) {
    if(!produtos ||produtos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhuma produto cadastrado."
    }else{
      this.mostrarTabela = true; 
    }
  }

}
