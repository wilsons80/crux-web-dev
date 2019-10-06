import { Component, OnInit } from "@angular/core";
import { DocumentoAtividade } from "src/app/core/documento-atividade";
import { Atividade } from "src/app/core/atividade";
import { AtividadeService } from "src/app/services/atividade/atividade.service";
import { DocumentoAtividadeService } from "src/app/services/documento-atividade/documento-atividade.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "src/app/services/toast/toast.service";

@Component({
  selector: "app-cadastrar-documento-atividade",
  templateUrl: "./cadastrar-documento-atividade.component.html",
  styleUrls: ["./cadastrar-documento-atividade.component.css"]
})
export class CadastrarDocumentoAtividadeComponent implements OnInit {
  documentoAtividade: DocumentoAtividade = new DocumentoAtividade();
  atividades: Atividade[];

  isAtualizar: boolean = false;

  constructor(
    private atividadeService: AtividadeService,
    private documentoAtividadeService: DocumentoAtividadeService,
    private activitedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {

    this.documentoAtividade.atividade = new Atividade();

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    });

    let idDocumentoAtividade: number;
    idDocumentoAtividade = this.activitedRoute.snapshot.queryParams
      .idDocumentoAtividade
      ? this.activitedRoute.snapshot.queryParams.idDocumentoAtividade
      : null;
    if (idDocumentoAtividade) {
      this.isAtualizar = true;
      this.documentoAtividadeService
        .getById(idDocumentoAtividade)
        .subscribe((documentoAtividade: DocumentoAtividade) => {
          this.documentoAtividade = documentoAtividade;
        });
    }
  }
  cadastrar() {
    this.documentoAtividadeService
      .cadastrar(this.documentoAtividade)
      .subscribe(() => {
        this.router.navigate(["documentoatividade"]);
        this.toastService.showSucesso(
          "Documento Atividade cadastrado com sucesso"
        );
      });
  }

  limpar() {
    this.documentoAtividade = new DocumentoAtividade();
  }

  cancelar() {
    this.router.navigate(["documentoatividade"]);
  }

  getNomeBotao() {
    return this.isAtualizar ? "Atualizar" : "Cadastrar";
  }

  atualizar() {
    this.documentoAtividadeService
      .alterar(this.documentoAtividade)
      .subscribe(() => {
        this.router.navigate(["documentoatividade"]);
        this.toastService.showSucesso(
          "Documento Atividade cadastrado com sucesso"
        );
      });
  }
}
