import { UnidadeService } from './../services/unidade/unidade.service';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AcessoUnidade } from '../core/acesso-unidade';

@Injectable({
    providedIn: 'root'
  })
@Injectable()
export class UnidadeResolver implements Resolve<AcessoUnidade> {
    constructor(private unidadeService: UnidadeService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

            return this.unidadeService.getUnidadesComAcesso();
    }
}
