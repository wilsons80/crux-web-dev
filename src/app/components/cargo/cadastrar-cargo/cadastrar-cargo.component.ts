import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cargo } from 'src/app/core/cargo';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TipoCargo } from 'src/app/core/tipo-cargo';

@Component({
  selector: 'app-cadastrar-cargo',
  templateUrl: './cadastrar-cargo.component.html',
  styleUrls: ['./cadastrar-cargo.component.css']
})
export class CadastrarCargoComponent implements OnInit {

  cargo: Cargo = new Cargo();

  isAtualizar: boolean = false;

  tiposCargo = [
    {tipo: TipoCargo.ESTAGIARIO, descricao: 'ESTAGIÁRIO'},
    {tipo: TipoCargo.FUNCIONARIO, descricao: 'FUNCIONÁRIO'},
    {tipo: TipoCargo.VOLUNTARIO, descricao: 'VOLUNTÁRIO'},
  ]

  constructor(
    private cargoService: CargosService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {


    let idCargo: number;
    idCargo = this.route.snapshot.queryParams.idCargo ? this.route.snapshot.queryParams.idCargo : null;
    if (idCargo) {
      this.isAtualizar = true;
      this.cargoService.getById(idCargo).subscribe((cargo: Cargo) => {
        this.cargo = cargo
      });
    }

  }
  cadastrar() {
    this.cargoService.cadastrar(this.cargo).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Cargo cadastrada com sucesso");
    });
  }

  limpar() {
    this.cargo = new Cargo();
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.cargoService.alterar(this.cargo).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Cargo cadastrada com sucesso");
    });

  }

}
