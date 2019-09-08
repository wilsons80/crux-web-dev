import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Metas } from 'src/app/core/metas';
import { Iniciativa } from 'src/app/core/iniciativa';
import { MetasService } from 'src/app/services/metas/metas.service';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { ActivatedRoute } from '@angular/router';
import { Objetivo } from 'src/app/core/objetivo';
import { Indicadores } from 'src/app/core/indicadores';

@Component({
  selector: 'app-cadastrar-iniciativas',
  templateUrl: './cadastrar-iniciativas.component.html',
  styleUrls: ['./cadastrar-iniciativas.component.css']
})
export class CadastrarIniciativasComponent implements OnInit {

  metas: Metas[];
  iniciativa: Iniciativa = new Iniciativa();

  isAtualizar: boolean = false;

  constructor(
    private iniciativaService: IniciativaService,
    private metasService: MetasService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }


  ngOnInit() {
    this.metasService.getAll().subscribe((metas: Metas[]) => {
      this.metas = metas;
    })

    let idIniciativa: number;
    idIniciativa = this.route.snapshot.queryParams.idIniciativa ? this.route.snapshot.queryParams.idIniciativa : null;
    if (idIniciativa) {
      this.isAtualizar = true;
      this.iniciativaService.getById(idIniciativa).subscribe((iniciativa: Iniciativa) => {
        this.iniciativa = iniciativa
      });
    }

  }
  cadastrar() {
    this.iniciativaService.cadastrar(this.iniciativa).subscribe(() => {
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
    this.iniciativaService.alterar(this.iniciativa).subscribe(() => {
      this.location.back();
    });

  }
}