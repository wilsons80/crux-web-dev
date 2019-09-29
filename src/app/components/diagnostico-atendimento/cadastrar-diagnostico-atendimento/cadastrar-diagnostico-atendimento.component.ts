import { Component, OnInit } from '@angular/core';
import { Diagnostico } from 'src/app/core/diagnostico';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DiagnosticoAtendimentoService } from 'src/app/services/diagnostico-atendimento/diagnostico-atendimento.service';

@Component({
  selector: 'app-cadastrar-diagnostico-atendimento',
  templateUrl: './cadastrar-diagnostico-atendimento.component.html',
  styleUrls: ['./cadastrar-diagnostico-atendimento.component.css']
})
export class CadastrarDiagnosticoAtendimentoComponent implements OnInit {

  diagnostico: Diagnostico = new Diagnostico();
  isAtualizar = false;

  constructor(
    private diagnosticoService: DiagnosticoAtendimentoService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {
    let id: number;
    id = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.diagnosticoService.getById(id).subscribe((diagnostico: Diagnostico) => {
        this.diagnostico = diagnostico;
      });
    }
  }

  cadastrar() {
    this.diagnosticoService.cadastrar(this.diagnostico).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Diagnóstico de atendimento com sucesso');
    });
  }

  limpar() {
    this.diagnostico = new Diagnostico();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.diagnosticoService.alterar(this.diagnostico).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Diagnóstico de atendimento atualizado com sucesso');
    });
  }

}
