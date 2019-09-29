import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatTooltipModule, MatPaginatorModule, MatStepperModule, MatDatepickerModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { DadosProfissionaisComponent } from './dados-profissionais/dados-profissionais.component';
import { OutrasInformacoesComponent } from './outras-informacoes/outras-informacoes.component';
import { FuncionalComponent } from './funcional/funcional.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { AcademicoComponent } from './academico/academico.component';
import { OutrasInformacoesAlunoComponent } from './outras-informacoes-aluno/outras-informacoes-aluno.component';



@NgModule({
  declarations: [
    DadosPessoaisComponent, 
    EscolaridadeComponent, 
    DocumentosComponent, 
    DadosProfissionaisComponent, 
    OutrasInformacoesComponent, 
    FuncionalComponent, 
    AcademicoComponent, 
    OutrasInformacoesAlunoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MaterialCommonModule
  ],
  exports:[
    DadosPessoaisComponent,
    EscolaridadeComponent, 
    DocumentosComponent, 
    DadosProfissionaisComponent,
    OutrasInformacoesComponent,
    FuncionalComponent,
    AcademicoComponent,
    OutrasInformacoesAlunoComponent
  ]
})
export class PessoaFisicaModule { }
