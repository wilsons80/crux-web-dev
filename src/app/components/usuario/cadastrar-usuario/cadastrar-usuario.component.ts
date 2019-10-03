import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { Location } from '@angular/common';

@Component({
  selector: 'cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  pessoaFisica: PessoaFisica = new PessoaFisica();
  usuario: UsuarioSistema = new UsuarioSistema();

  isAtualizar = false;

  constructor(
    private usuarioSistemaService: UsuarioSistemaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.usuario.pessoaFisica = this.pessoaFisica;

    let id: number;
    id = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.usuarioSistemaService.getById(id).subscribe((usuario: UsuarioSistema) => {
        this.usuario = usuario;
      });
    }
  }

  cadastrar() {
    this.usuarioSistemaService.cadastrar(this.usuario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Usuário cadastrado com sucesso');
    });
  }

  limpar() {
    this.usuario = new UsuarioSistema();
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
    this.usuarioSistemaService.alterar(this.usuario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Usuário atualizado com sucesso');
    });
  }

}
