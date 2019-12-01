import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/core/cargo';
import { Funcionario } from 'src/app/core/funcionario';
import { CargosService } from './../../../services/cargos/cargos.service';
import { FuncionarioService } from './../../../services/funcionario/funcionario.service';

@Component({
  selector: 'colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  funcionarios: Funcionario[];
  cargos: Cargo[];

  constructor(
    private funcionarioService: FuncionarioService,
    private cargosService: CargosService
  ) { }

  ngOnInit() {

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => this.funcionarios = funcionarios);
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.cargos = cargos)

  }

}
