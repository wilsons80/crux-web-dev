import { Modulo } from './../../core/modulo';
import { UsuarioUnidade } from './../../core/usuario-unidade';
import { GrupoModulo } from './../../core/grupo-modulo';
import { GrupoModuloService } from './../../services/grupo-modulo/grupo-modulo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';
import { Acesso } from 'src/app/core/acesso';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { UsuariosUnidades } from 'src/app/core/usuarios-unidades';
import { ModuloService } from 'src/app/services/modulo/modulo.service';

@Component({
  selector: 'grupo-modulo',
  templateUrl: './grupo-modulo.component.html',
  styleUrls: ['./grupo-modulo.component.css']
})
export class GrupoModuloComponent implements OnInit {

  usuarioUnidades: UsuariosUnidades[];
  usuarioUnidade: UsuariosUnidades = new UsuariosUnidades();

  modulos: Modulo[];
  modulo: Modulo = new Modulo();

  perfilAcesso: Acesso;

  mostrarTabela = false;
  msg: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['unidade', 'nomemodulo', 'permissao', 'acoes'];
  dataSource: MatTableDataSource<GrupoModulo> = new MatTableDataSource();

  constructor(private grupoModuloService: GrupoModuloService,
              private usuarioUnidadeService: UsuarioUnidadeService,
              private moduloService: ModuloService,
              private router: Router,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();

    this.usuarioUnidadeService.getUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: UsuariosUnidades[]) => {
      this.usuarioUnidades = unidades;
    });

    this.moduloService.getAll().subscribe((modulos: Modulo[]) => {
      this.modulos = modulos;
    });
  }

  limpar() {
    this.modulo = new Modulo();
    this.usuarioUnidade.unidade = new Unidade();

    this.mostrarTabela = false;
    this.dataSource.data = [];
  }

  consultar() {
    const idUnidadeBusca = this.usuarioUnidade.unidade ? this.usuarioUnidade.unidade.idUnidade : '';
    const idModuloBusca  = this.modulo ? this.modulo.id : '';

    this.grupoModuloService.getAllByUnidadeAndModulo(idUnidadeBusca, idModuloBusca)
    .subscribe((gruposModulos: GrupoModulo[]) => {
      if (!gruposModulos) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum registro para a pesquisa selecionada';
      } else {
        this.dataSource.data = gruposModulos ? gruposModulos : [];
        this.mostrarTabela = true;
      }
    });
  }

  getAll() {
    this.grupoModuloService.getAll().subscribe((gruposModulos: GrupoModulo[]) => {
      this.dataSource.data = gruposModulos ? gruposModulos : [];
      this.verificaMostrarTabela(gruposModulos);
    });
  }

  verificaMostrarTabela(gruposModulos: GrupoModulo[]) {
    if (!gruposModulos || gruposModulos.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum usuário cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }

  atualizar(grupoModulo: GrupoModulo) {
    this.router.navigate(['/grupomodulo/cadastrar'], { queryParams: { id: grupoModulo.id } });
  }

  deletar(grupoModulo: GrupoModulo) {
    this.chamaCaixaDialogo(grupoModulo);
  }

  chamaCaixaDialogo(grupoModulo: GrupoModulo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o módulo ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.grupoModuloService.excluir(grupoModulo.id).subscribe(() => {
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

}
