import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AcaoCompetencia } from 'src/app/core/acao-competencia';
import { AcoesCompetenciaService } from 'src/app/services/acoes-competencia/acoes-competencia.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Component({
  selector: 'app-acao-competencia',
  templateUrl: './acao-competencia.component.html',
  styleUrls: ['./acao-competencia.component.css']
})
export class AcaoCompetenciaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaAcaoCompetencia: AcaoCompetencia[];
  mostrarTabela: boolean = false;
  acaoCompetencia: AcaoCompetencia = new AcaoCompetencia();
  msg: string;
  pessoas:PessoaFisica[];
  pessoa:PessoaFisica;


  displayedColumns: string[] = ['descricao', 'dataInicio', 'acoes'];
  dataSource: MatTableDataSource<AcaoCompetencia> = new MatTableDataSource();

  constructor(
    private acaoCompetenciaService: AcoesCompetenciaService,
    private pessoaFisicaService:PessoaFisicaService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.pessoaFisicaService.getAll().subscribe((pessoas:PessoaFisica[]) => {
      this.pessoas = pessoas;
    })
  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.acaoCompetencia = new AcaoCompetencia();
    this.msg = '';
  }

  consultar() {
    this.acaoCompetenciaService.getPorPessoa(this.pessoa.id).subscribe((acaoCompetencia: AcaoCompetencia) => {
      if(!acaoCompetencia){
        this.mostrarTabela = false
        this.msg = "Nenhum registro para a pesquisa selecionada"
      }else {
        this.dataSource.data = [acaoCompetencia];
        this.mostrarTabela = true;
      }
    },
    ()  => {
      this.msg = "Nenhum registro para a pesquisa selecionada"
      this.limpar()
    }
    )
  }


  atualizar(acaoCompetencia: AcaoCompetencia) {
    this.router.navigate(['/acaocompetencia/cadastrar'], { queryParams: { idAcaoCompetencia: acaoCompetencia.id } });
  }

  deletar(acaoCompetencia: AcaoCompetencia) {
    this.chamaCaixaDialogo(acaoCompetencia);
  }

  chamaCaixaDialogo(acaoCompetencia: AcaoCompetencia) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a Ação Competência?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.acaoCompetenciaService.excluir(acaoCompetencia.id).subscribe(() => {
          this.acaoCompetencia.id = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.acaoCompetenciaService.getAll().subscribe((listaAcaoCompetencia: AcaoCompetencia[]) => {
      this.listaAcaoCompetencia = listaAcaoCompetencia;
      this.dataSource.data = listaAcaoCompetencia ? listaAcaoCompetencia : [];
      this.verificaMostrarTabela(listaAcaoCompetencia);
    })
  }
  verificaMostrarTabela(acaoCompetencias: AcaoCompetencia[]) {
    if (!acaoCompetencias || acaoCompetencias.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma Ação Competência cadastradas."
    } else {
      this.mostrarTabela = true;
    }
  }

}
