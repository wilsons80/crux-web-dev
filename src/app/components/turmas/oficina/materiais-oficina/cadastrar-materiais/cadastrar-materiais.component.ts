import { Atividade } from 'src/app/core/atividade';
import { Material } from 'src/app/core/material';
import { MateriaisAtividade } from 'src/app/core/materiais-atividade';
import { Component, OnInit, Input } from '@angular/core';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { MaterialService } from 'src/app/services/material/material.service';
import * as _ from 'lodash';

@Component({
  selector: 'cadastrar-materiais',
  templateUrl: './cadastrar-materiais.component.html',
  styleUrls: ['./cadastrar-materiais.component.css']
})
export class CadastrarMateriaisComponent implements OnInit {

  @Input() materiaisAtividade: MateriaisAtividade[];
  materialAtividade: MateriaisAtividade = new MateriaisAtividade();

  listaDeMateriais: Material[] = [];

  isAtualizar = false;
  isMostrarFuncionario = false;

  constructor(
    private atividadeService: AtividadeService,
    private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.materialAtividade.atividade = new Atividade();
    this.materialAtividade.material = new Material();
    this.materialService.getAll().subscribe((materiais: Material[]) => this.listaDeMateriais = materiais)
  }


  zerarCombos() {
    this.materialAtividade = new MateriaisAtividade();
    this.materialAtividade.atividade = new Atividade();
    this.materialAtividade.material = new Material();
    this.isMostrarFuncionario = false;
  }

  adicionar() {
    const materialAtividade = new MateriaisAtividade();
    Object.assign(materialAtividade, this.materialAtividade);

    this.materiaisAtividade.push(materialAtividade);
    this.zerarCombos();
  }

  atualizar() {
    const index = this.materiaisAtividade.indexOf(this.materiaisAtividade.find(col => col.id === this.materialAtividade.id));
    this.materiaisAtividade.splice(index, 1, this.materialAtividade);

    this.isAtualizar = false;
    this.zerarCombos();
  }

  atualizarColaborador(materialAtividade: MateriaisAtividade) {
    this.isAtualizar = true;
    this.materialAtividade = materialAtividade;
  }

  cancelar() {
    this.zerarCombos();
    this.isAtualizar = false;
  }


  setMaterial(id: number){
    this.materialAtividade.material = _.cloneDeep(_.find(this.listaDeMateriais, (c: Material) => c.id === id));
  }


}
