import { MenuService } from './../../../services/menu/menu.service';
import { Menu } from 'src/app/core/menu';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-escolher-unidade',
  templateUrl: './escolher-unidade.component.html',
  styleUrls: ['./escolher-unidade.component.css']
})
export class EscolherUnidadeComponent implements OnInit {

  unidades: any[];

  constructor(
    private unidadeService:UnidadeService,
    private menuService:MenuService,
    private router:Router
  ) { }

  ngOnInit() {
   this.unidadeService.getPorUsuario().subscribe((unidades:any[]) => {
     this.unidades = unidades;
   })
  }

  escolherUnidade(idUnidade:number){
    this.unidadeService.getUnidadePorId(idUnidade).subscribe(() => this.router.navigate([`home`]));

    // this.unidadeService.getUnidadePorId(idUnidade).pipe(
    //   switchMap((unidade:Unidade) => {return this.menuService.getMenuPrincipal()} )
    // )
    // .subscribe((menu) => {
    //   console.log("menuzao da massa", menu);
    //   this.router.navigate([`home`]);
    // })
  }
     
}
