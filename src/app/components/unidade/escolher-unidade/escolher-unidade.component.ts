import { ParamService } from './../../../services/param/param.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escolher-unidade',
  templateUrl: './escolher-unidade.component.html',
  styleUrls: ['./escolher-unidade.component.css']
})
export class EscolherUnidadeComponent implements OnInit {

  unidades: any[];

  constructor(
    private paramService:ParamService
  ) { }

  ngOnInit() {
    this.unidades = this.paramService.getObjeto(); 
    this.paramService.setObjeto(null);
  }

}
