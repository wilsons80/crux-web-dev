import { Component, OnInit } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Router } from '@angular/router';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';
import { UploadFotoComponent } from 'src/app/components/common/upload-foto/upload-foto.component';


@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

  unidades:any;

  unidade:Unidade = new Unidade()

  mostrarTabela: boolean = false;

  displayedColumns: string[] = ['sigla', 'nome', 'tipo', 'acoes'];
  dataSource: MatTableDataSource<any>;
  constructor(
    private unidadeService:UnidadeService,
    private router:Router,
    private dialog: MatDialog,
    private controleMenuService:ControleMenuService
  ) { }

  ngOnInit() {
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades:any) => {
      this.unidades = unidades;
    });
    this.dataSource = new MatTableDataSource(this.unidades);
  }

  consultar(){
    if(this.unidade.idUnidade){
      this.unidadeService.getUnidadePorId(this.unidade.idUnidade).subscribe((unidade:Unidade) => {
        let array = [];
        array.push(unidade);
        this.dataSource.data = array
      })
    }else{
      this.dataSource.data = this.unidades;
    }
    this.mostrarTabela = true;
  }

  limpar(){
    this.mostrarTabela = false;
    this.unidade = new Unidade()
    this.dataSource.data = null;
  }

  atualizar(unidade:Unidade){
    this.router.navigate(['/unidade/cadastrar'], { queryParams: { idUnidade: unidade.idUnidade} });
  }
  
  deletar(element:Unidade) {
    this.chamaCaixaDialogo(element);
  }

  chamaCaixaDialogo(element:Unidade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a unidade ${element.siglaUnidade}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
       this.unidadeService.excluir(element.idUnidade).subscribe(() => {
          this.ngOnInit();
       })
        
      } else {
        dialogRef.close();
      }
    }
    );
  }


  editarFoto(unidade:Unidade){
    this.abrirDialogUploadFoto(unidade);
  }


  mostrarAcao(acao: string) {
    return this.controleMenuService.acessoModulos['UNIDADE'][acao] == 'S'
  }
  
  abrirDialogUploadFoto(unidade:Unidade) {

    const dialogRef = this.dialog.open(UploadFotoComponent, {
      
      data: {
        unidade: unidade,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }


}
