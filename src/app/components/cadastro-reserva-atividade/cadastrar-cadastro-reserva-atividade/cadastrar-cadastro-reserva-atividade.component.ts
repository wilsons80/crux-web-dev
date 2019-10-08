import { CadastroReservaAtividade } from './../../../core/cadastro-reserva-atividade';
import { PessoaFisicaService } from './../../../services/pessoa-fisica/pessoa-fisica.service';
import { Component, OnInit } from '@angular/core';
import { ProdutosAtividade } from 'src/app/core/produtos-atividade';
import { Produto } from 'src/app/core/produto';
import { Atividade } from 'src/app/core/atividade';
import { FormaPagamento } from 'src/app/core/forma-pagamento';
import { ProdutosAtividadeService } from 'src/app/services/produtos-atividade/produtos-atividade.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CadastroReservaAtividadeService } from 'src/app/services/cadastro-reserva-atividade/cadastro-reserva-atividade.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Component({
  selector: 'app-cadastrar-cadastro-reserva-atividade',
  templateUrl: './cadastrar-cadastro-reserva-atividade.component.html',
  styleUrls: ['./cadastrar-cadastro-reserva-atividade.component.css']
})
export class CadastrarCadastroReservaAtividadeComponent implements OnInit {

  cadastroReserva: CadastroReservaAtividade = new CadastroReservaAtividade()
  pessoas: PessoaFisica[];
  atividades: Atividade[];

  formasPagamento: any = [
    {id:1, sigla:FormaPagamento.DINHEIRO, descricao: 'DINHEIRO'},
    {id:2, sigla:FormaPagamento.CARTAO, descricao: 'CARTÃO'},
    {id:3, sigla:FormaPagamento.DEBITO, descricao: 'DÉBITO'},
    {id:4, sigla:FormaPagamento.DESCONTO_FOLHA, descricao: 'DESCONTO EM FOLHA'},
  ]

  isAtualizar: boolean = false;

  constructor(
    private cadastroReservaAtividadeService: CadastroReservaAtividadeService,
    private pessoaService: PessoaFisicaService,
    private atividadeService: AtividadeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {

    this.cadastroReserva.pessoasFisica = new PessoaFisica();
    this.cadastroReserva.atividade = new Atividade();

    this.pessoaService.getAll().subscribe((pessoas: PessoaFisica[]) => {
      this.pessoas = pessoas;
    })

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    })

    let idCadastroReserva: number;
    idCadastroReserva = this.route.snapshot.queryParams.idCadastroReserva ? this.route.snapshot.queryParams.idCadastroReserva : null;
    if (idCadastroReserva) {
      this.isAtualizar = true;
      this.cadastroReservaAtividadeService.getById(idCadastroReserva).subscribe((cadastroReserva: CadastroReservaAtividade) => {
        this.cadastroReserva = cadastroReserva
      });
    }

  }
  cadastrar() {
    this.cadastroReservaAtividadeService.cadastrar(this.cadastroReserva).subscribe(() => {
      this.router.navigate(['produtosatividade']);
      this.toastService.showSucesso("Cadastro de Reserva da Atividade cadastrado com sucesso");
    });
  }

  limpar() {
    this.cadastroReserva = new CadastroReservaAtividade();
  }

  cancelar() {
    this.router.navigate(['produtosatividade']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.cadastroReservaAtividadeService.alterar(this.cadastroReserva).subscribe(() => {
      this.router.navigate(['cadastroreservaatividade']);
      this.toastService.showSucesso("Cadastro de Reserva da Atividade atualizado com sucesso");
    });

  }

}
