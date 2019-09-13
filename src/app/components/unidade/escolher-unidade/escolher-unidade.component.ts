import { MenuService } from './../../../services/menu/menu.service';
import { Menu } from 'src/app/core/menu';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';
import { switchMap } from 'rxjs/operators';
import { AcessoUnidade } from 'src/app/core/acesso-unidade';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';

@Component({
  selector: 'app-escolher-unidade',
  templateUrl: './escolher-unidade.component.html',
  styleUrls: ['./escolher-unidade.component.css']
})
export class EscolherUnidadeComponent implements OnInit {
 
  
  
  
  unidades: AcessoUnidade[];
  
  constructor(
    private unidadeService:UnidadeService,
    private menuService:MenuService,
    private router:Router,
    private toolbarPrincipalService:ToolbarPrincipalService,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
  }
  
  escolherUnidade(idUnidade:number){
    
    this.unidadeService.getUnidadePorId(idUnidade).pipe(
      switchMap((unidade:Unidade) => {return this.menuService.getMenuPrincipal()} )
      )
    .subscribe((menu) => {
      console.log("menuzao da massa", menu);
      this.router.navigate([`home`]);
    })
  }
  
  ngAfterContentChecked(): void {
    this.unidades = this.toolbarPrincipalService.unidades;
    this.changeDetectorRef.detectChanges();
  }
     
}
