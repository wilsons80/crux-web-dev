import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { switchMap } from 'rxjs/operators';
import { AcessoUnidade } from 'src/app/core/acesso-unidade';
import { Unidade } from 'src/app/core/unidade';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { ArquivoService } from './../../../services/arquivo/arquivo.service';
import { MenuService } from './../../../services/menu/menu.service';
import { Observable } from 'rxjs';
import { FileUtils } from 'src/app/utils/file-utils';

@Component({
  selector: 'app-escolher-unidade',
  templateUrl: './escolher-unidade.component.html',
  styleUrls: ['./escolher-unidade.component.css']
})
export class EscolherUnidadeComponent implements OnInit {

  unidades: AcessoUnidade[];
  imageurl: any;

  constructor(
    private unidadeService: UnidadeService,
    private menuService: MenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private arquivoService: ArquivoService,
    private fileUtils:FileUtils,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      switchMap((data: {unidades:AcessoUnidade[]})=>{
        this.unidades = data.unidades;
        _.forEach(this.unidades, (unidade:AcessoUnidade) => {
          this.arquivoService.get(unidade.id).subscribe((response:any) => {
            unidade.logo = this.fileUtils.convertBufferArrayToBase64(response);
          });  
        });
        
         return new Observable(obs => obs.next())
      })
    ).subscribe();

  }
  
  escolherUnidade(idUnidade: number) {
    this.unidadeService.getUnidadePorId(idUnidade).pipe(
      switchMap((unidade: Unidade) => { 
        return this.menuService.getMenuPrincipal() 
      })
    )
      .subscribe((menu) => {
        console.log("menuzao da massa", menu);
        this.router.navigate([`home`]);
      })
  }

  getBackground(unidade:AcessoUnidade){
    if(unidade && unidade.logo){
      return `url(${unidade.logo.changingThisBreaksApplicationSecurity})`
    }
  }

  
}
