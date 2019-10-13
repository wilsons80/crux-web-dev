import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { ColaboradoresProjeto } from 'src/app/core/colaboradores-projeto';
import { ColaboradoresProjetoService } from 'src/app/services/colaboradores-projeto/colaboradores-projeto.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-colaboradores-projeto',
  templateUrl: './colaboradores-projeto.component.html',
  styleUrls: ['./colaboradores-projeto.component.css']
})
export class ColaboradoresProjetoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaColaboradores: ColaboradoresProjeto[];
  mostrarTabela: boolean = false;
  colaboradores: ColaboradoresProjeto = new ColaboradoresProjeto();
  msg:string;

  perfilAcesso:PerfilAcesso;

  displayedColumns: string[] = ['nome', 'projeto', 'cargo','dataInicio', 'acoes'];
  dataSource: MatTableDataSource<ColaboradoresProjeto> = new MatTableDataSource();

  constructor(
    private colaboradoresProjetoService: ColaboradoresProjetoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
 

  limpar() {
    this.mostrarTabela = false;
    this.colaboradores = new ColaboradoresProjeto()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.colaboradores.id) {
      this.colaboradoresProjetoService.getById(this.colaboradores.id).subscribe((colaboradores: ColaboradoresProjeto) => {
        if(!colaboradores){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [colaboradores];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(colaboradores: ColaboradoresProjeto) {
    this.router.navigate(['/colaboradoresprojeto/cadastrar'], { queryParams: { idColaborador: colaboradores.id } });
  }

  deletar(colaboradores: ColaboradoresProjeto) {
    this.chamaCaixaDialogo(colaboradores);
  }

  chamaCaixaDialogo(colaboradores: ColaboradoresProjeto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o colaborador?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.colaboradoresProjetoService.excluir(colaboradores.id).subscribe(() => {
          this.colaboradores.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.colaboradoresProjetoService.getAll().subscribe((colaboradores: ColaboradoresProjeto[]) => {
      this.listaColaboradores = colaboradores;
      this.dataSource.data = colaboradores ? colaboradores : [];
      this.verificaMostrarTabela(colaboradores);
    })
  }

  verificaMostrarTabela(colaboradores: ColaboradoresProjeto[]) {
    if(!colaboradores ||colaboradores.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum colaborador cadastrado."
    }else{
      this.mostrarTabela = true; 
    }
  }

}
