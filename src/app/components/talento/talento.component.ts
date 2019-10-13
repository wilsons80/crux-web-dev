import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Talento } from 'src/app/core/talento';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { TalentosService } from 'src/app/services/talentos/talentos.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-talento',
  templateUrl: './talento.component.html',
  styleUrls: ['./talento.component.css']
})
export class TalentoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaPessoas: PessoaFisica[];
  listaTalentos: Talento[];
  mostrarTabela: boolean = false;
  msg: string;
  pessoaFisica: PessoaFisica;
  talento: Talento = new Talento()

  displayedColumns: string[] = ['nome', 'dataRespostaTalento', 'nrNotaCompetencia', 'acoes'];
  dataSource: MatTableDataSource<Talento> = new MatTableDataSource();

  perfilAcesso: PerfilAcesso;


  constructor(
    private talentosService: TalentosService,
    private pessoaFisicaService: PessoaFisicaService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.pessoaFisicaService.getAll().subscribe((listaPessoas: PessoaFisica[]) => {
      this.listaPessoas = listaPessoas;
    })

  }


  limpar() {
    this.mostrarTabela = false;
    this.talento = new Talento()
    this.pessoaFisica = null;
    this.dataSource.data = [];
    this.msg = '';
  }

  consultar() {
    this.talentosService.getByIdPessoaFisica(this.pessoaFisica.id).subscribe((talentos: Talento[]) => {
      if (!talentos) {
        this.mostrarTabela = false
        this.msg = "Nenhum registro para a pesquisa selecionada"
      } else {
        this.dataSource.data = talentos;
        this.mostrarTabela = true;
      }
    },
      () => {
        this.msg = "Nenhum registro para a pesquisa selecionada"
        this.limpar()
      }
    )

  }


  atualizar(talento: Talento) {
    this.router.navigate(['/talento/cadastrar'], { queryParams: { idTalento: talento.id } });
  }

  deletar(talento: Talento) {
    this.chamaCaixaDialogo(talento);
  }

  chamaCaixaDialogo(talento: Talento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o talento do funcionario?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.talentosService.excluir(talento.id).subscribe(() => {
          this.talento.id = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

}
