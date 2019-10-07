import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { Location } from '@angular/common';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  usuarioSistema: UsuarioSistema = new UsuarioSistema();

  isAtualizar = false;

  constructor(
    private usuarioSistemaService: UsuarioSistemaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
    private fileUtils: FileUtils,
  ) {
  }

  ngOnInit() {
    this.limpar();

    let id: number;
    id = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.usuarioSistemaService.getById(id).pipe(
        switchMap((usuarioSistema: UsuarioSistema) => {
          this.usuarioSistema = usuarioSistema;
          return this.arquivoPessoaFisicaService.get(usuarioSistema.pessoaFisica.id);
        })
      ).subscribe((foto: any) => {
        this.usuarioSistema.pessoaFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.usuarioSistema.pessoaFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });
    }
  }

  cadastrar() {
    this.usuarioSistemaService.cadastrar(this.usuarioSistema).pipe(
      switchMap((alunoRetorno: UsuarioSistema) => {
        if (this.usuarioSistema.pessoaFisica.isFotoChanged && this.usuarioSistema.pessoaFisica.foto) {
          return this.arquivoPessoaFisicaService.gravar(this.usuarioSistema.pessoaFisica.foto, alunoRetorno.pessoaFisica.id);
        } else {
          return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Usuário cadastrado com sucesso');
    });
  }

  limpar() {
    this.usuarioSistema = new UsuarioSistema();
    this.usuarioSistema.pessoaFisica = new PessoaFisica();
  }

  cancelar() {
    this.location.back();
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.usuarioSistemaService.alterar(this.usuarioSistema).pipe(
      switchMap((usuarioSistema: UsuarioSistema) => {
        if (this.usuarioSistema.pessoaFisica.isFotoChanged && this.usuarioSistema.pessoaFisica.foto) {
          return this.arquivoPessoaFisicaService.alterar(this.usuarioSistema.pessoaFisica.foto, usuarioSistema.pessoaFisica.id);
        } else {
         return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Usuário atualizado com sucesso');
    });
  }

}
