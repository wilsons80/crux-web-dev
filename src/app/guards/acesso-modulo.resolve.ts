import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import _ from 'lodash';
import { Observable, of } from "rxjs";
import { switchMap } from 'rxjs/operators';
import { PerfilAcesso } from '../core/perfil-acesso';
import { AcessoService } from './../services/acesso/acesso.service';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class AcessoModuloResolver implements Resolve<PerfilAcesso> {
    constructor(
        private acessoService: AcessoService,
        private router: Router,
    ) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        let modulo = route.data['modulo'];
        let path: string = state.url.toUpperCase();

        return this.acessoService.getPerfilAcesso(modulo).pipe(
            switchMap((perfilAcesso: PerfilAcesso[]) => {
                if (_.isEmpty(perfilAcesso) || perfilAcesso[0].consulta === "N") {
                    this.router.navigate(['acessorestrito'])
                }

                return of(perfilAcesso);
            })
        )
    }
}
