import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cargo } from 'src/app/core/cargo';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TipoCargo } from 'src/app/core/tipo-cargo';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-cargo',
  templateUrl: './cadastrar-cargo.component.html',
  styleUrls: ['./cadastrar-cargo.component.css']
})
export class CadastrarCargoComponent implements OnInit {

  cargo: Cargo = new Cargo();

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  tiposCargo = [
    {tipo: TipoCargo.ESTAGIARIO, descricao: 'ESTAGIÁRIO'},
    {tipo: TipoCargo.FUNCIONARIO, descricao: 'FUNCIONÁRIO'},
    {tipo: TipoCargo.VOLUNTARIO, descricao: 'VOLUNTÁRIO'},
  ]

  constructor(
    private cargoService: CargosService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.insere === 'N'){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(this.perfilAcesso.altera === 'N'){
      this.mostrarBotaoAtualizar = false;
    }


    let idCargo: number;
    idCargo = this.activatedRoute.snapshot.queryParams.idCargo ? this.activatedRoute.snapshot.queryParams.idCargo : null;
    if (idCargo) {
      this.isAtualizar = true;
      this.cargoService.getById(idCargo).subscribe((cargo: Cargo) => {
        this.cargo = cargo
      });
    }

  }
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
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


  atualizar() {
    this.cargoService.alterar(this.cargo).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Cargo cadastrada com sucesso");
    });

  }

}
