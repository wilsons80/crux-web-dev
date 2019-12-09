import { Component, OnInit, Input } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';
import { Atividade } from 'src/app/core/atividade';
import { Unidade } from 'src/app/core/unidade';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { Projeto } from 'src/app/core/projeto';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'cadastrar-oficinas',
  templateUrl: './cadastrar-oficinas.component.html',
  styleUrls: ['./cadastrar-oficinas.component.css']
})
export class CadastrarOficinasComponent implements OnInit {
  
  @Input() turma: Turmas;
  oficina: Atividade = new Atividade();

  isAtualizar = false;

  constructor(private toastService: ToastService) { }
  
  ngOnInit(): void {
    this.oficina.unidade = new Unidade();
    this.oficina.planosAcao = new PlanosAcao();
    this.oficina.projeto = new Projeto();
  }


  atualizarOficina(oficina: Atividade) {
    this.isAtualizar = true;
    this.oficina = oficina;
  }

  copiar() {
    let successful = true;
    const msg = successful ? `Dados da oficina copiado com sucesso` : 'Erro ao copiar os dados da oficina.';
    this.toastService.showAlerta(msg);
  }

}
