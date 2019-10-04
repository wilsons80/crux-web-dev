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

  usuarioSistema: UsuarioSistema = new UsuarioSistema();

  isAtualizar = false;

  constructor(
    private usuarioSistemaService: UsuarioSistemaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.limpar();

    let id: number;
    id = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.usuarioSistemaService.getById(id).subscribe((usuarioSistema: UsuarioSistema) => {
        this.usuarioSistema = usuarioSistema;
      });
    }
  }

  cadastrar() {
    this.usuarioSistemaService.cadastrar(this.usuarioSistema).subscribe(() => {
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
    this.usuarioSistemaService.alterar(this.usuarioSistema).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Usuário atualizado com sucesso');
    });
  }

}