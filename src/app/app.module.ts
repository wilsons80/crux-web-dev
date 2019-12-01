import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorIntl, MatSidenavModule, MatSnackBarModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcaoCompetenciaModule } from './components/acao-competencia/acao-competencia.module';
import { AcessoRestritoComponent } from './components/acesso-restrito/acesso-restrito.component';
import { AcessoModule } from './components/acesso/acesso.module';
import { AcoesAtividadeModule } from './components/acoes-atividade/acoes-atividade.module';
import { AlunoTrabalhandoModule } from './components/aluno-trabalhando/aluno-trabalhando.module';
import { AlunoModule } from './components/aluno/aluno.module';
import { AtendimentoModule } from './components/atendimento/atendimento.module';
import { AtividadeAlunoModule } from './components/atividade-aluno/atividade-aluno.module';
import { AtividadeModule } from './components/atividade/atividade.module';
import { AvaliacaoAlunoModule } from './components/avaliacao-aluno/avaliacao-aluno.module';
import { AvaliacaoAtividadeModule } from './components/avaliacao-atividade/avaliacao-atividade.module';
import { CadastroReservaAtividadeModule } from './components/cadastro-reserva-atividade/cadastro-reserva-atividade.module';
import { CargoModule } from './components/cargo/cargo.module';
import { ColaboradoresProgramaModule } from './components/colaboradores-programa/colaboradores-programa.module';
import { ColaboradoresProjetoModule } from './components/colaboradores-projeto/colaboradores-projeto.module';
import { AuthInterceptor } from './components/common/auth-interceptor/auth-interceptor';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { ExceptionHandlerModule } from './components/common/exception-handler/exception-handler.module';
import { HttpErrorToastComponent } from './components/common/http-error-toast/http-error-toast.component';
import { HttpMgmtModule } from './components/common/http-mgmt/http-mgmt.module';
import { LoadingPopupModule } from './components/common/loading-popup/loading-popup.module';
import { PaginaNaoEncontradaComponent } from './components/common/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { TempoSessaoDialogComponent } from './components/common/tempo-sessao-dialog/tempo-sessao-dialog.component';
import { CondicaoMoradiaModule } from './components/condicao-moradia/condicao-moradia.module';
import { CursoFormacaoModule } from './components/curso-formacao/curso-formacao.module';
import { DepartamentoModule } from './components/departamento/departamento.module';
import { DiagnosticoAtendimentoModule } from './components/diagnostico-atendimento/diagnostico-atendimento.module';
import { DocumentoAtividadeModule } from './components/documento-atividade/documento-atividade.module';
import { EmpresaModule } from './components/empresa/empresa.module';
import { EncaminhamentoAlunoModule } from './components/encaminhamento-aluno/encaminhamento-aluno.module';
import { EntidadeSocialModule } from './components/entidade-social/entidade-social.module';
import { FaltasFuncionarioModule } from './components/faltas-funcionario/faltas-funcionario.module';
import { FamiliarAlunoModule } from './components/familiar-aluno/familiar-aluno.module';
import { FrequenciaAlunoModule } from './components/frequencia-aluno/frequencia-aluno.module';
import { FuncionarioModule } from './components/funcionario/funcionario.module';
import { GrausInstrucaoModule } from './components/graus-instrucao/graus-instrucao.module';
import { GrupoModuloModule } from './components/grupo-modulo/grupo-modulo.module';
import { HomeModule } from './components/home/home.module';
import { IndicadoresModule } from './components/indicadores/indicadores.module';
import { IniciativasModule } from './components/iniciativas/iniciativas.module';
import { InstituicaoModule } from './components/instituicao/instituicao.module';
import { LoginModule } from './components/login/login.module';
import { MenuPrincipalModule } from './components/menu-principal/menu-principal.module';
import { MetasModule } from './components/metas/metas.module';
import { NovaSenhaModule } from './components/nova-senha/nova-senha.module';
import { ObjetivoModule } from './components/objetivo/objetivo.module';
import { ParticipanteAtendimentoModule } from './components/participante-atendimento/participante-atendimento.module';
import { PerspectivaModule } from './components/perspectiva/perspectiva.module';
import { PlanosAcaoModule } from './components/planos-acao/planos-acao.module';
import { ProdutoModule } from './components/produto/produto.module';
import { ProdutosAtividadeModule } from './components/produtos-atividade/produtos-atividade.module';
import { ProgramasModule } from './components/programas/programas.module';
import { ProjetoModule } from './components/projeto/projeto.module';
import { QuestionarioModule } from './components/questionario/questionario.module';
import { ReprovacaoAlunoModule } from './components/reprovacao-aluno/reprovacao-aluno.module';
import { SituacaoVulnerabilidadeModule } from './components/situacao-vulnerabilidade/situacao-vulnerabilidade.module';
import { SolucaoAtendimentoModule } from './components/solucao-atendimento/solucao-atendimento.module';
import { TalentoModule } from './components/talento/talento.module';
import { TempoSessaoModule } from './components/tempo-sessao/tempo-sessao.module';
import { ToolBarPrincipalModule } from './components/tool-bar-principal/tool-bar-principal.module';
import { UnidadeModule } from './components/unidade/unidade.module';
import { UniformeEntregueAlunoModule } from './components/uniforme-entregue-aluno/uniforme-entregue-aluno.module';
import { UploadFotoModule } from './components/upload-foto/upload-foto.module';
import { UsuarioModule } from './components/usuario/usuario.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { getPortuguesePaginatorIntl } from './portuguese-paginator-intl/portuguese-paginator-intl.component';
import { CboModule } from './components/cbo/cbo.module';
import { TipoOcorrenciaAlunoComponent } from './components/tipo-ocorrencia-aluno/tipo-ocorrencia-aluno.component';
import { TipoOcorrenciaAlunoModule } from './components/tipo-ocorrencia-aluno/tipo-ocorrencia-aluno.module';
import { OcorrenciaAlunoModule } from './components/ocorrencia-aluno/ocorrencia-aluno.module';
import { UnidadesMultiplasComponent } from './components/common/unidades-multiplas/unidades-multiplas.component';
import { TiposContratacoesModule } from './components/tipos-contratacoes/tipos-contratacoes.module';

export const MY_FORMATS = {
  parse: {
      dateInput: 'DD/MM/YYYY',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MM YYYY',
  },
};

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  entryComponents: [
    HttpErrorToastComponent,
    ConfirmDialogComponent,
    TempoSessaoDialogComponent
  ],
  declarations: [
    AppComponent,
    HttpErrorToastComponent,
    PaginaNaoEncontradaComponent,
    ConfirmDialogComponent,
    AcessoRestritoComponent,
    TempoSessaoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LoginModule,
    HomeModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule,
    ExceptionHandlerModule,
    MatSnackBarModule,
    HttpMgmtModule,
    MatDialogModule,
    LoadingPopupModule,
    NovaSenhaModule,
    ToolBarPrincipalModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MenuPrincipalModule,
    MatDialogModule,
    MatToolbarModule,
    AcessoModule,
    ImageCropperModule,
    MatCardModule,
    DepartamentoModule,
    PerspectivaModule,
    ObjetivoModule,
    IndicadoresModule,
    IniciativasModule,
    MetasModule,
    SharedPipesModule,
    UnidadeModule,
    PlanosAcaoModule,
    ProgramasModule,
    ProjetoModule,
    ProdutoModule,
    AtividadeModule,
    UploadFotoModule,
    FuncionarioModule,
    EmpresaModule,
    CargoModule,
    CursoFormacaoModule,
    AlunoModule,
    GrausInstrucaoModule,
    QuestionarioModule,
    FaltasFuncionarioModule,
    TalentoModule,
    AcaoCompetenciaModule,
    FamiliarAlunoModule,
    SituacaoVulnerabilidadeModule,
    DiagnosticoAtendimentoModule,
    SolucaoAtendimentoModule,
    EntidadeSocialModule,
    EncaminhamentoAlunoModule,
    ReprovacaoAlunoModule,
    AtividadeAlunoModule,
    FrequenciaAlunoModule,
    UniformeEntregueAlunoModule,
    AvaliacaoAtividadeModule,
    AvaliacaoAlunoModule,
    AlunoTrabalhandoModule,
    AtendimentoModule,
    ParticipanteAtendimentoModule,
    CondicaoMoradiaModule,
    UsuarioModule,
    DocumentoAtividadeModule,
    ColaboradoresProgramaModule,
    ColaboradoresProjetoModule,
    ProdutosAtividadeModule,
    CadastroReservaAtividadeModule,
    TempoSessaoModule,
    AcoesAtividadeModule,
    InstituicaoModule,
    GrupoModuloModule,
    TextMaskModule,
    CboModule,
    TipoOcorrenciaAlunoModule,
    OcorrenciaAlunoModule,
    TiposContratacoesModule

  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
