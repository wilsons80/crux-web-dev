import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css']
})
export class AtividadeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  atividades: Atividade[];
  atividade: Atividade = new Atividade();
  msg:string;
  perfilAcesso:PerfilAcesso;

  mostrarTabela = false;

  displayedColumns: string[] = ['descricao', 'dataPrevisaoInicio', 'dataPrevisaoTermino', 'cargaHoraria', 'acoes'];
  dataSource: MatTableDataSource<Atividade> = new MatTableDataSource();

  constructor(
    private atividadeService: AtividadeService,
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
    this.atividade = new Atividade()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.atividade.id) {
      this.atividadeService.getById(this.atividade.id).subscribe((atividade: Atividade) => {
        if(!atividade){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [atividade];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(atividade: Atividade) {
    this.router.navigate(['/atividade/cadastrar'], { queryParams: { idAtividade: atividade.id } });
  }

  deletar(atividade: Atividade) {
    this.chamaCaixaDialogo(atividade);
  }

  chamaCaixaDialogo(atividade: Atividade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a atividade?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.atividadeService.excluir(atividade.id).subscribe(() => {
          this.atividade.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

   getAll() {
    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
      this.dataSource.data = atividades ? atividades : [];
      this.verificaMostrarTabela(atividades);
    })
  }

  verificaMostrarTabela(atividades: Atividade[]) {
    if(!atividades || atividades.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhuma atividade cadastrada."
    }else{
      this.mostrarTabela = true; 
    }
  }

}
