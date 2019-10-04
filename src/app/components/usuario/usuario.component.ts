import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  usuarios: UsuarioSistema[];
  usuarioSistema: UsuarioSistema = new UsuarioSistema();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['username', 'nome', 'status', 'dataInicioVigencia', 'dataFimVigencia', 'acoes'];
  dataSource: MatTableDataSource<UsuarioSistema> = new MatTableDataSource();

  constructor(
    private usuarioSistemaService: UsuarioSistemaService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.initObjetos();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  initObjetos() {
    this.usuarioSistema = new UsuarioSistema();
    this.usuarioSistema.pessoaFisica = new PessoaFisica();
  }

  limpar() {
    this.initObjetos();
    this.mostrarTabela = false;
    this.dataSource.data = [];
  }

  consultar() {
    if (this.usuarioSistema.idUsuario) {
      this.usuarioSistemaService.getById(this.usuarioSistema.idUsuario).subscribe((usuario: UsuarioSistema) => {
        if (!usuario) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [usuario];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }

  atualizar(usuarioSistema: UsuarioSistema) {
    this.router.navigate(['/usuariosistema/cadastrar'], { queryParams: { id: usuarioSistema.idUsuario } });
  }

  deletar(usuarioSistema: UsuarioSistema) {
    this.chamaCaixaDialogo(usuarioSistema);
  }

  chamaCaixaDialogo(usuarioSistema: UsuarioSistema) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o usuário ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.usuarioSistemaService.excluir(usuarioSistema.idUsuario).subscribe(() => {
          this.usuarioSistema.idUsuario = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

  getAll() {
    this.usuarioSistemaService.getAll().subscribe((usuarios: UsuarioSistema[]) => {
      this.usuarios = usuarios;
      this.dataSource.data = usuarios ? usuarios : [];
      this.verificaMostrarTabela(usuarios);
    });
  }

  verificaMostrarTabela(usuarios: UsuarioSistema[]) {
    if (!usuarios || usuarios.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum usuário cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }


}
