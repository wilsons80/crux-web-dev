import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Aluno } from 'src/app/core/aluno';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-escolha-familiar',
  templateUrl: './escolha-familiar.component.html',
  styleUrls: ['./escolha-familiar.component.css']
})
export class EscolhaFamiliarComponent implements OnInit {

  pessoaFisica: PessoaFisica = new PessoaFisica();
  mostarFormularioFamiliar = false;


  // ==============================================================
  // Variáveis referente aos dados do aluno
  autoComplete = new FormControl();

  aluno: Aluno = new Aluno();
  alunos$: Observable<any[]>;
  alunos: Aluno[] = [];

  alunoSelecionado = false;

  mostrarTabelaAluno = false;
  msg: string;
  displayedColumnsAluno: string[] = ['matricula', 'nome', 'identidade', 'orgao', 'uf', 'acao'];
  dataSourceAluno: MatTableDataSource<Aluno> = new MatTableDataSource();

  // ==============================================================


  constructor(private alunoService: AlunoService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private location: Location,
    private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
    private fileUtils: FileUtils,
    private familiarAlunoService: FamiliarAlunoService
    ) {
    this.pessoaFisica.grausInstrucao = new GrausInstrucao();
  }

  ngOnInit() {
    this.aluno.pessoaFisica = new PessoaFisica();

    this.activate();
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                Métodos para buscar o aluno
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  consultarAlunosPorNome() {
    this.getAlunosByNome(this.aluno.pessoaFisica.nome);
  }

  private getAlunosByNome(nomeAluno: string) {
    if (nomeAluno === '' || nomeAluno === undefined) {
      this.toastService.showAlerta('Informe pelo menos um nome para busca.');
    } else {
      this.alunoService.getAlunosByNome(nomeAluno).subscribe((alunos: Aluno[]) => {
        this.dataSourceAluno.data = alunos ? alunos : [];
        this.verificaMostrarTabela(alunos);
      });
    }
  }

  verificaMostrarTabela(alunos: Aluno[]) {
    if (!alunos || alunos.length === 0) {
      this.mostrarTabelaAluno = false;
      this.msg = 'Nenhum aluno cadastrado.';
    } else {
      this.mostrarTabelaAluno = true;
    }
  }



  activate(): any {
    this.alunoService.getAll().subscribe( (valor: Aluno[]) => {
      this.alunos = valor;
      this.autoComplete.setValue('');
    });

    this.alunos$ = this.autoComplete.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this.filtrar(value) : this.alunos.slice())
      );
  }

  filtrar(searchText: any) {
    const descricao = searchText.pessoaFisica != null ? searchText.pessoaFisica.nome : searchText;
    return this.alunos.filter(state => state.pessoaFisica.nome.toLowerCase().includes(descricao.toLowerCase()));
  }

  vincular(aluno: Aluno) {
    this.aluno = aluno;
  }

  displayFn(valor: any): string {
    return valor != null ? (valor.pessoaFisica !== undefined ? valor.pessoaFisica.nome : valor) : valor;
  }

  selecionar(event: any) {
    this.aluno = this.autoComplete.value;
    this.alunoSelecionado = true;

    this.arquivoPessoaFisicaService.get(this.aluno.pessoaFisica.id).subscribe((foto: any) => {
      this.aluno.pessoaFisica.foto = foto;
      foto = this.fileUtils.convertBufferArrayToBase64(foto);
      this.aluno.pessoaFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
    });
  }

  limparSelecao() {
    this.autoComplete.setValue(' ');

    this.aluno = new Aluno();
    this.aluno.pessoaFisica = new PessoaFisica();
    this.alunoSelecionado = false;
    this.mostarFormularioFamiliar = false;
  }


  mostrarFomularioFamiliar(evento: any) {
    this.mostarFormularioFamiliar = true;
  }

}
