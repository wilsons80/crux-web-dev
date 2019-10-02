import { Component, OnInit } from '@angular/core';
import { CondicoesMoradiaService } from 'src/app/services/condicoes-moradia/condicoes-moradia.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';

@Component({
  selector: 'cadastrar-condicao-moradia',
  templateUrl: './cadastrar-condicao-moradia.component.html',
  styleUrls: ['./cadastrar-condicao-moradia.component.css']
})
export class CadastrarCondicaoMoradiaComponent implements OnInit {

  condicoesMoradia: CondicoesMoradia[];
  condicaoMoradia: CondicoesMoradia = new CondicoesMoradia();
  isAtualizar = false;

  constructor(
    private condicaoMoradiaService: CondicoesMoradiaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {
    this.condicaoMoradiaService.getAll().subscribe((condicoesMoradia: CondicoesMoradia[]) => {
      this.condicoesMoradia = condicoesMoradia;
    });

    let id: number;
    id = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.condicaoMoradiaService.getById(id).subscribe((condicaoMoradia: CondicoesMoradia) => {
        this.condicaoMoradia = condicaoMoradia;
      });
    }

  }
  cadastrar() {
    this.condicaoMoradiaService.cadastrar(this.condicaoMoradia).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Condição de moradia cadastrada com sucesso');
    });
  }

  limpar() {
    this.condicaoMoradia = new CondicoesMoradia();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.condicaoMoradiaService.alterar(this.condicaoMoradia).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Condição de moradia atualizada com sucesso');
    });
  }

}
