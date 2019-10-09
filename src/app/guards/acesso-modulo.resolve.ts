import { AcessoService } from './../services/acesso/acesso.service';
import { AcessoModule } from './../components/acesso/acesso.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from 'rxjs/operators';
import { PerfilAcesso } from '../core/perfil-acesso';
import { UnidadeService } from '../services/unidade/unidade.service';
import _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class AcessoModuloResolver implements Resolve<PerfilAcesso> {
    constructor(
        private acessoService:AcessoService,
        private router:Router,
    ) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        let modulo = route.data['modulo'];

        return this.acessoService.getPerfilAcesso(modulo).pipe(
            switchMap((perfilAcesso:PerfilAcesso) => {
                if(_.isEmpty(perfilAcesso) || perfilAcesso.insere == 'N'){
                    this.router.navigate(['acessorestrito'])
                }
                return of(perfilAcesso);
            })
        )
    }
}
