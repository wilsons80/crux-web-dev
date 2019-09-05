import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Indicadores } from 'src/app/core/indicadores';
import { Metas } from 'src/app/core/metas';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { MetasService } from 'src/app/services/metas/metas.service';
import { ActivatedRoute } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { IndicadoresService } from 'src/app/services/indicadores/indicadores.service';

@Component({
  selector: 'app-cadastrar-metas',
  templateUrl: './cadastrar-metas.component.html',
  styleUrls: ['./cadastrar-metas.component.css']
})
export class CadastrarMetasComponent implements OnInit {

  indicadores: Indicadores[];
  metas: Metas = new Metas();

  isAtualizar: boolean = false;

  constructor(
    private indicadoresService: IndicadoresService,
    private metasService: MetasService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }


  ngOnInit() {
    this.indicadoresService.getAll().subscribe((indicadores: Indicadores[]) => {
      this.indicadores = indicadores;
    })

    let idMetas: number;
    idMetas = this.route.snapshot.queryParams.idMetas ? this.route.snapshot.queryParams.idMetas : null;
    if (idMetas) {
      this.isAtualizar = true;
      this.metasService.getById(idMetas).subscribe((metas: Metas) => {
        this.metas = metas
      });
    }

  }
  cadastrar() {
    this.metasService.cadastrar(this.metas).subscribe(() => {
      this.location.back();
    });
  }

  limpar() { }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.metasService.alterar(this.metas).subscribe(() => {
      this.location.back();
    });

  }

}
