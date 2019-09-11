import { Modulos } from './../../core/modulos';
import { Usuario } from 'src/app/core/usuario';
import { CadastroAcesso } from '../../core/cadastro-acesso';
import { AcessoService } from './../../services/acesso/acesso.service';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { ModuloService } from './../../services/modulo/modulo.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatDialogConfig, MatPaginator } from '@angular/material';
import _ from 'lodash';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PerfilAcessoUsuario } from 'src/app/core/perfilAcessoUsuario';


@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  cadastroAcesso: CadastroAcesso = new CadastroAcesso();
  perfilAcessoUsuario:PerfilAcessoUsuario;

  usuarios: Usuario[];
  modulos: Modulos[];

  mostrarTabela: boolean = false;

  displayedColumns: string[] = ['usuario', 'modulo', 'perfil', 'acoes'];
  dataSource: MatTableDataSource<PerfilAcessoUsuario> = new MatTableDataSource();
  msg: string;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private moduloService: ModuloService,
    private activatedRoute: ActivatedRoute,
    public controleMenuService: ControleMenuService,
    private acessoService: AcessoService,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
 
  consultar() {
    this.acessoService.getPerfilAcessoDoUsuario(this.cadastroAcesso.idUnidade, this.cadastroAcesso.idUsuario, this.cadastroAcesso.idModulo)
      .subscribe((perfilAcessoUsuario: PerfilAcessoUsuario) => {
        if(perfilAcessoUsuario){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else{
          this.dataSource.data = [perfilAcessoUsuario]
          this.mostrarTabela = true;
        }
      })
  }
 
  limpar() {
    this.cadastroAcesso.idUsuario = null;
    this.cadastroAcesso.idModulo = null;
    this.dataSource.data = [];
    this.mostrarTabela = false;
  }

  deletar(perfilAcessoUsuario:PerfilAcessoUsuario) {
    this.chamaCaixaDialogo(perfilAcessoUsuario);
  }

  chamaCaixaDialogo(perfilAcessoUsuario:PerfilAcessoUsuario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: 'Certeza que desse excluir o acesso?',
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.acessoService.excluir(perfilAcessoUsuario.idUsuarioGrupo).subscribe(() => {
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.cadastroAcesso.idUnidade = this.activatedRoute.snapshot.params.idUnidade;
      this.usuarioService.getUsuariosPorUnidade(this.cadastroAcesso.idUnidade).subscribe((usuarios:Usuario[]) => {
        this.usuarios = usuarios;
      });

    this.moduloService.getModulosPorUnidade(this.cadastroAcesso.idUnidade).subscribe((modulos:Modulos[]) => {
      this.modulos = modulos;
    });
  }

}
