import { UsuarioUnidade } from './../../core/usuario-unidade';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Modulos } from './../../core/modulos';
import { Usuario } from 'src/app/core/usuario';
import { CadastroAcesso } from '../../core/cadastro-acesso';
import { AcessoService } from './../../services/acesso/acesso.service';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { ModuloService } from './../../services/modulo/modulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatDialogConfig, MatPaginator } from '@angular/material';
import _ from 'lodash';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PerfilAcessoUsuario } from 'src/app/core/perfil-acesso-usuario';
import { Modulo } from 'src/app/core/modulo';


@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  cadastroAcesso: CadastroAcesso = new CadastroAcesso();
  perfilAcessoUsuario:PerfilAcessoUsuario;

  usuarios: UsuarioUnidade[];
  modulos: Modulo[];

  mostrarTabela: boolean = false;

  displayedColumns: string[] = ['nomeUsuario', 'nomeModulo','nomeUnidade', 'nomeGrupoModulo', 'acoes'];
  dataSource: MatTableDataSource<PerfilAcessoUsuario> = new MatTableDataSource();
  msg: string;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private moduloService: ModuloService,
    private activatedRoute: ActivatedRoute,
    public controleMenuService: ControleMenuService,
    private acessoService: AcessoService,
    private router: Router,
  ) { }

  ngOnInit() {
    
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
 
  consultar() {
    this.acessoService.getPerfilAcessoDoUsuario(2, this.cadastroAcesso.idUsuario, this.cadastroAcesso.idModulo)
      .subscribe((perfilAcessoUsuario: PerfilAcessoUsuario[]) => {
        
        if(_.isEmpty(perfilAcessoUsuario)){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else{
          this.dataSource.data = perfilAcessoUsuario
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

  atualizar(cadastroAcesso: CadastroAcesso) {
    this.router.navigate(['/acesso/cadastrar'], { queryParams: { idGrupoModulo: cadastroAcesso.idGrupoModulo } });
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
    //TODO ESPERANDO FAZER O METODO NO BACKEND
    this.cadastroAcesso.idUnidade = this.activatedRoute.snapshot.params.idUnidade;
      this.usuarioService.getUsuariosPorUnidade(2).subscribe((usuarios:UsuarioUnidade[]) => {
        this.usuarios = usuarios;
      });

    this.moduloService.getModulosPorUnidade(2).subscribe((modulos:Modulo[]) => {
      this.modulos = modulos;
    });
  }

}
