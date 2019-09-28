import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PessoaFisica } from "src/app/core/pessoa-fisica";
import { BaseService } from "../base/base.service";

interface Path {
  rootPath: "api/pessoafisica/";
}

@Injectable({
  providedIn: "root"
})
export class PessoaFisicaService extends BaseService<PessoaFisica, Path> {
  constructor(http: HttpClient) {
    super(http);
  }
}
