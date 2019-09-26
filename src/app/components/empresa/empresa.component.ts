import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Empresa } from 'src/app/core/empresa';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  empresas: Empresa[];
  mostrarTabela: boolean = false;
  empresa: Empresa = new Empresa();
  msg:string;


  displayedColumns: string[] = ['codigo', 'nomeRazaoSocial', 'cnpj', 'telefone', 'ativa', 'acoes'];


  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
 

  limpar() {
    this.mostrarTabela = false;
    this.empresa = new Empresa()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.empresa.id) {
      this.empresaService.getById(this.empresa.id).subscribe((empresa: Empresa) => {
        if(!empresa){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [empresa];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(empresa: Empresa) {
    this.router.navigate(['/empresa/cadastrar'], { queryParams: { idEmpresa: empresa.id } });
  }

  deletar(empresa: Empresa) {
    this.chamaCaixaDialogo(empresa);
  }

  chamaCaixaDialogo(empresa: Empresa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a empresa?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.empresaService.excluir(empresa.id).subscribe(() => {
          this.empresa.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.empresaService.getAll().subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
      this.dataSource.data = empresas ? empresas : [];
      this.verificaMostrarTabela(empresas);
    })
  }

  verificaMostrarTabela(empresas: Empresa[]) {
    if(!empresas ||empresas.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhuma empresa cadastrada."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
