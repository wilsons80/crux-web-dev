import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';
import * as _ from 'lodash';
import { MateriaisAtividade } from 'src/app/core/materiais-atividade';
import { FormaPagamento } from 'src/app/core/forma-pagamento';
import { Material } from 'src/app/core/material';
import { MaterialService } from 'src/app/services/material/material.service';
import { MateriaisAtividadeService } from 'src/app/services/materiais-atividade/materiais-atividade.service';



@Component({
  selector: 'cadastrar-materiais-atividade',
  templateUrl: './cadastrar-materiais-atividade.component.html',
  styleUrls: ['./cadastrar-materiais-atividade.component.css']
})
export class CadastrarMateriaisAtividadeComponent implements OnInit {

  materiaisAtividade: MateriaisAtividade = new MateriaisAtividade()
  materiais: Material[];
  atividades: Atividade[];

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  formasPagamento: any = [
    {id:1, sigla:FormaPagamento.DINHEIRO, descricao: 'DINHEIRO'},
    {id:2, sigla:FormaPagamento.CARTAO, descricao: 'CARTÃO'},
    {id:3, sigla:FormaPagamento.DEBITO, descricao: 'DÉBITO'},
    {id:4, sigla:FormaPagamento.DESCONTO_FOLHA, descricao: 'DESCONTO EM FOLHA'},
  ]

  isAtualizar: boolean = false;

  constructor(
    private materiaisAtividadeService: MateriaisAtividadeService,
    private materialService: MaterialService,
    private atividadeService: AtividadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.materiaisAtividade.material = new Material();
    this.materiaisAtividade.atividade = new Atividade();
    this.materiaisAtividade.observacao = '';

    this.materialService.getAll().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
    })

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    })

    let idMaterialAtividade: number;
    idMaterialAtividade = this.activatedRoute.snapshot.queryParams.idMaterialAtividade ? this.activatedRoute.snapshot.queryParams.idMaterialAtividade : null;
    if (idMaterialAtividade) {
      this.isAtualizar = true;
      this.materiaisAtividadeService.getById(idMaterialAtividade).subscribe((materiaisAtividade: MateriaisAtividade) => {
        this.materiaisAtividade = materiaisAtividade
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
    this.materiaisAtividadeService.cadastrar(this.materiaisAtividade).subscribe(() => {
      this.router.navigate(['materiaisatividade']);
      this.toastService.showSucesso("Material Atividade cadastrado com sucesso");
    });
  }

  limpar() {
    this.materiaisAtividade = new MateriaisAtividade();
    this.materiaisAtividade.atividade = new Atividade();
  }

  cancelar() {
    this.router.navigate(['materiaisatividade']);
  }


  atualizar() {
    this.materiaisAtividadeService.alterar(this.materiaisAtividade).subscribe(() => {
      this.router.navigate(['materiaisatividade']);
      this.toastService.showSucesso("Material Atividade atualizado com sucesso");
    });

  }

  mostrarDadosAtividade(idAtividade: number) {
    this.materiaisAtividade.atividade = _.cloneDeep(_.find(this.atividades, (ati: Atividade) => ati.id === idAtividade));
  }

}
