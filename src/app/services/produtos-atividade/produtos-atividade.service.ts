import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProdutosAtividade } from 'src/app/core/produtos-atividade';
import { Rotas } from "src/app/core/rotas";
import { BaseService } from "../base/base.service";

@Injectable({
  providedIn: "root"
})
export class ProdutosAtividadeService extends BaseService<ProdutosAtividade> {

  constructor(http: HttpClient) {
    super(http, Rotas.PRODUTO_ATIVIDADE);
  }

  getPorAtividade(idAtividade: number) {
    return this.http.get(Rotas.PRODUTO_ATIVIDADE + `atividade/${idAtividade}`)
  }
}
