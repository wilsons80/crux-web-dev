import { EmpresaModule } from './components/empresa/empresa.module';
import { FuncionarioModule } from './components/funcionario/funcionario.module';
import { UploadFotoModule } from './components/upload-foto/upload-foto.module';
import { AtividadeModule } from './components/atividade/atividade.module';
import { ProdutoModule } from './components/produto/produto.module';
import { MetasModule } from './components/metas/metas.module';
import { ObjetivoModule } from './components/objetivo/objetivo.module';
import { DepartamentoModule } from './components/departamento/departamento.module';
import { AcessoModule } from './components/acesso/acesso.module';
import { MenuPrincipalModule } from './components/menu-principal/menu-principal.module';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { MatIconModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDialogModule, MatSidenavModule, MatMenuModule, MatExpansionModule, MatDividerModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatCardModule, MatPaginatorIntl } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './components/common/auth-interceptor/auth-interceptor';
import { HttpErrorToastComponent } from './components/common/http-error-toast/http-error-toast.component';
import { ExceptionHandlerModule } from './components/common/exception-handler/exception-handler.module';
import { HttpMgmtModule } from './components/common/http-mgmt/http-mgmt.module';
import { LoadingPopupModule } from './components/common/loading-popup/loading-popup.module';
import { PaginaNaoEncontradaComponent } from './components/common/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NovaSenhaModule } from './components/nova-senha/nova-senha.module';
import { ToolBarPrincipalModule } from './components/tool-bar-principal/tool-bar-principal.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PerspectivaModule } from './components/perspectiva/perspectiva.module';
import { IndicadoresModule } from './components/indicadores/indicadores.module';
import { IniciativasModule } from './components/iniciativas/iniciativas.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { getPortuguesePaginatorIntl } from './portuguese-paginator-intl/portuguese-paginator-intl.component';
import { UnidadeModule } from './components/unidade/unidade.module';
import { PlanosAcaoModule } from './components/planos-acao/planos-acao.module';
import { ProgramasModule } from './components/programas/programas.module';
import { ProjetoModule } from './components/projeto/projeto.module';
import { CargoModule } from './components/cargo/cargo.module';
import { CursoFormacaoComponent } from './components/curso-formacao/curso-formacao.component';
import { AlunoComponent } from './components/aluno/aluno.component';
import { CadastarAlunoComponent } from './components/aluno/cadastar-aluno/cadastar-aluno.component';
import { FamiliarAlunoComponent } from './components/familiar-aluno/familiar-aluno.component';
import { CadastrarFamiliarAlunoComponent } from './components/familiar-aluno/cadastrar-familiar-aluno/cadastrar-familiar-aluno.component';
import { ResponsavelAlunoComponent } from './components/responsavel-aluno/responsavel-aluno.component';
import { CadastrarResponsavelAlunoComponent } from './components/responsavel-aluno/cadastrar-responsavel-aluno/cadastrar-responsavel-aluno.component';
import { SituacaoVulnerabilidadeComponent } from './components/situacao-vulnerabilidade/situacao-vulnerabilidade.component';
import { CadastrarSituacaoVulnerabilidadeComponent } from './components/situacao-vulnerabilidade/cadastrar-situacao-vulnerabilidade/cadastrar-situacao-vulnerabilidade.component';
import { DiagnosticoAtendimentoComponent } from './components/diagnostico-atendimento/diagnostico-atendimento.component';
import { CadastrarDiagnosticoAtendimentoComponent } from './components/diagnostico-atendimento/cadastrar-diagnostico-atendimento/cadastrar-diagnostico-atendimento.component';
import { SolucaoAtendimentoComponent } from './components/solucao-atendimento/solucao-atendimento.component';
import { CadastrarSolucaoAtendimentoComponent } from './components/solucao-atendimento/cadastrar-solucao-atendimento/cadastrar-solucao-atendimento.component';
import { VulnerabilidadeFamiliarComponent } from './components/vulnerabilidade-familiar/vulnerabilidade-familiar.component';
import { CadastrarVulnerabilidadeFamiliarComponent } from './components/vulnerabilidade-familiar/cadastrar-vulnerabilidade-familiar/cadastrar-vulnerabilidade-familiar.component';
import { VulnerabilidadeAlunoComponent } from './components/vulnerabilidade-aluno/vulnerabilidade-aluno.component';
import { CadastrarVulnerabilidadeAlunoComponent } from './components/vulnerabilidade-aluno/cadastrar-vulnerabilidade-aluno/cadastrar-vulnerabilidade-aluno.component';
import { EntidadeSocialComponent } from './components/entidade-social/entidade-social.component';
import { CadastrarEntidadeSocialComponent } from './components/entidade-social/cadastrar-entidade-social/cadastrar-entidade-social.component';
import { EncaminhamentoAlunoComponent } from './components/encaminhamento-aluno/encaminhamento-aluno.component';
import { CadastrarEncaminhamentoAlunoComponent } from './components/encaminhamento-aluno/cadastrar-encaminhamento-aluno/cadastrar-encaminhamento-aluno.component';
import { ReprovacaoAlunoComponent } from './components/reprovacao-aluno/reprovacao-aluno.component';
import { CadastrarReprovacaoAlunoComponent } from './components/reprovacao-aluno/cadastrar-reprovacao-aluno/cadastrar-reprovacao-aluno.component';
import { AtividadeAlunoComponent } from './components/atividade-aluno/atividade-aluno.component';
import { CadastrarAtividadeAlunoComponent } from './components/atividade-aluno/cadastrar-atividade-aluno/cadastrar-atividade-aluno.component';
import { FrequenciaAlunoComponent } from './components/frequencia-aluno/frequencia-aluno.component';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  entryComponents: [
    HttpErrorToastComponent,
    ConfirmDialogComponent,
  ],
  declarations: [
    AppComponent,
    HttpErrorToastComponent,
    PaginaNaoEncontradaComponent,
    ConfirmDialogComponent,
    CursoFormacaoComponent,
    AlunoComponent,
    CadastarAlunoComponent,
    FamiliarAlunoComponent,
    CadastrarFamiliarAlunoComponent,
    ResponsavelAlunoComponent,
    CadastrarResponsavelAlunoComponent,
    SituacaoVulnerabilidadeComponent,
    CadastrarSituacaoVulnerabilidadeComponent,
    DiagnosticoAtendimentoComponent,
    CadastrarDiagnosticoAtendimentoComponent,
    SolucaoAtendimentoComponent,
    CadastrarSolucaoAtendimentoComponent,
    VulnerabilidadeFamiliarComponent,
    CadastrarVulnerabilidadeFamiliarComponent,
    VulnerabilidadeAlunoComponent,
    CadastrarVulnerabilidadeAlunoComponent,
    EntidadeSocialComponent,
    CadastrarEntidadeSocialComponent,
    EncaminhamentoAlunoComponent,
    CadastrarEncaminhamentoAlunoComponent,
    ReprovacaoAlunoComponent,
    CadastrarReprovacaoAlunoComponent,
    AtividadeAlunoComponent,
    CadastrarAtividadeAlunoComponent,
    FrequenciaAlunoComponent,
    
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
    CargoModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl()},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'pt-BR' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
