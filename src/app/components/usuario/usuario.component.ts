import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  usuarios: UsuarioSistema[];
  usuario: UsuarioSistema = new UsuarioSistema();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['username', 'nome', 'status', 'dataInicioVigencia', 'dataFimVigencia', 'acoes'];
  dataSource: MatTableDataSource<UsuarioSistema> = new MatTableDataSource();

  constructor(
    private usuarioSistemaService: UsuarioSistemaService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.usuario = new UsuarioSistema();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.usuario.idUsuario) {
      this.usuarioSistemaService.getById(this.usuario.idUsuario).subscribe((usuario: UsuarioSistema) => {
        if(!usuario){
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

  atualizar(usuario: UsuarioSistema) {
    this.router.navigate(['/usuario/cadastrar'], { queryParams: { id: usuario.idUsuario } });
  }

  deletar(usuario: UsuarioSistema) {
    this.chamaCaixaDialogo(usuario);
  }

  chamaCaixaDialogo(usuario: UsuarioSistema) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o usuário ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.usuarioSistemaService.excluir(usuario.idUsuario).subscribe(() => {
          this.usuario.idUsuario = null;
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
    if (!usuarios ||usuarios.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum usuário cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }


}
