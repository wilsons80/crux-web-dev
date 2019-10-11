import { ColaboradoresPrograma } from './../../core/colaboradores-programa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { ColaboradoresProgramaService } from 'src/app/services/colaboradores-programa/colaboradores-programa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-colaboradores-programa',
  templateUrl: './colaboradores-programa.component.html',
  styleUrls: ['./colaboradores-programa.component.css']
})
export class ColaboradoresProgramaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaColaboradores: ColaboradoresPrograma[];
  mostrarTabela: boolean = false;
  colaboradores: ColaboradoresPrograma = new ColaboradoresPrograma();
  msg:string;
  perfilAcesso:PerfilAcesso;

  
  displayedColumns: string[] = ['nome', 'programa', 'cargo','dataInicio', 'acoes'];
  dataSource: MatTableDataSource<ColaboradoresPrograma> = new MatTableDataSource();
  
  constructor(
    private colaboradoresProgramaService: ColaboradoresProgramaService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.altera === 'N' && this.perfilAcesso.deleta === 'N'){
      this.displayedColumns = ['nome', 'programa', 'cargo','dataInicio'];
    }


    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
 

  limpar() {
    this.mostrarTabela = false;
    this.colaboradores = new ColaboradoresPrograma()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.colaboradores.id) {
      this.colaboradoresProgramaService.getById(this.colaboradores.id).subscribe((colaboradores: ColaboradoresPrograma) => {
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


  atualizar(colaboradores: ColaboradoresPrograma) {
    this.router.navigate(['/colaboradoresprograma/cadastrar'], { queryParams: { idColaborador: colaboradores.id } });
  }

  deletar(colaboradores: ColaboradoresPrograma) {
    this.chamaCaixaDialogo(colaboradores);
  }

  chamaCaixaDialogo(colaboradores: ColaboradoresPrograma) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o colaborador?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.colaboradoresProgramaService.excluir(colaboradores.id).subscribe(() => {
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
    this.colaboradoresProgramaService.getAll().subscribe((colaboradores: ColaboradoresPrograma[]) => {
      this.listaColaboradores = colaboradores;
      this.dataSource.data = colaboradores ? colaboradores : [];
      this.verificaMostrarTabela(colaboradores);
    })
  }

  verificaMostrarTabela(colaboradores: ColaboradoresPrograma[]) {
    if(!colaboradores ||colaboradores.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum colaborador cadastrado."
    }else{
      this.mostrarTabela = true; 
    }
  }

}
