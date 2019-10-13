import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perspectiva } from 'src/app/core/perspectiva';
import { Unidade } from 'src/app/core/unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { PerspectivaService } from './../../../services/perspectiva/perspectiva.service';
import { ToastService } from './../../../services/toast/toast.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-perspectiva',
  templateUrl: './cadastrar-perspectiva.component.html',
  styleUrls: ['./cadastrar-perspectiva.component.css']
})
export class CadastrarPerspectivaComponent implements OnInit {

  unidades: Unidade[];
  perspectiva: Perspectiva = new Perspectiva();

  isAtualizar: boolean = false;

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;


  constructor(
    private unidadeService: UnidadeService,
    private perspectivaService: PerspectivaService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {
    this.perspectiva.unidade = new Unidade();
  }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.insere === 'N'){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(this.perfilAcesso.altera === 'N'){
      this.mostrarBotaoAtualizar = false;
    }
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    })

    let idPerspectiva: number;
    idPerspectiva = this.activatedRoute.snapshot.queryParams.idPerspectiva ? this.activatedRoute.snapshot.queryParams.idPerspectiva : null;
    if (idPerspectiva) {
      this.isAtualizar = true;
      this.perspectivaService.getById(idPerspectiva).subscribe((perspectiva: Perspectiva) => {
        this.perspectiva = perspectiva
      });
    }

  }
  cadastrar() {
    this.perspectivaService.cadastrar(this.perspectiva).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Perspectiva cadastrada com sucesso");
    });
  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  limpar() {
    this.perspectiva = new Perspectiva();
  }

  cancelar() {
    this.location.back();
  }



  atualizar() {
    this.perspectivaService.alterar(this.perspectiva).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Perspectiva atualizada com sucesso");
    });

  }

}
