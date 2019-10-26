import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlunoService } from './../../../services/aluno/aluno.service';
import _ from 'lodash';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-atividade-aluno',
  templateUrl: './cadastrar-atividade-aluno.component.html',
  styleUrls: ['./cadastrar-atividade-aluno.component.css']
})
export class CadastrarAtividadeAlunoComponent implements OnInit {

  atividadeAluno: AtividadeAluno = new AtividadeAluno();
  alunos: Aluno[];
  atividades: Atividade[];
  
  alunoSelecionado: Aluno;
  atividadeSelecionada: Atividade;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private atividadeAlunoService: AtividadeAlunoService,
    private alunoService: AlunoService,
    private atividadeService: AtividadeService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.atividadeAluno.aluno = new Aluno();
    this.atividadeAluno.atividade = new Atividade();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    let idAtividadeAluno: number;
    idAtividadeAluno = this.activatedRoute.snapshot.queryParams.idAtividadeAluno ? this.activatedRoute.snapshot.queryParams.idAtividadeAluno : null;
   

    this.alunoService.getAll().pipe(

      switchMap((alunos: Aluno[]) => {
        this.alunos = alunos;
        return  this.atividadeService.getAll()
      }),

      switchMap((atividades: Atividade[]) => {
        this.atividades = atividades;
        
        if(idAtividadeAluno){
          this.isAtualizar = true;
          return this.atividadeAlunoService.getById(idAtividadeAluno);
        }
          return new Observable(ob => ob.next());
      }),
      
    ).subscribe((atividadeAluno: AtividadeAluno)=> {
      if(atividadeAluno){
        this.atividadeAluno = atividadeAluno
        this.mostrarDadosAluno(this.atividadeAluno.aluno.id)
        this.mostrarDadosAtividade(this.atividadeAluno.atividade.id)
      }
    })

 
  }
  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.atividadeAlunoService.cadastrar(this.atividadeAluno).subscribe(() => {
      this.router.navigate(['atividadealuno']);
      this.toastService.showSucesso("Atividade aluno cadastrada com sucesso");
    });
  }

  limpar() {
    this.atividadeAluno = new AtividadeAluno();
  }

  cancelar() {
    this.router.navigate(['atividadealuno']);
  }


  atualizar() {
    this.atividadeAlunoService.alterar(this.atividadeAluno).subscribe(() => {
      this.router.navigate(['atividadealuno']);
      this.toastService.showSucesso("Atividade aluno atualizado com sucesso");
    });

  }

  mostrarDadosAluno(idAluno){
    this.alunoSelecionado = _.find(this.alunos, (a:Aluno) => a.id === idAluno);
  }
  
  mostrarDadosAtividade(idAtividade){
    this.atividadeSelecionada = _.find(this.atividades, (a:Atividade) => a.id === idAtividade);
  }

}
