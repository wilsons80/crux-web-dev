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



@NgModule({
  declarations: [
    DadosPessoaisComponent, 
    EscolaridadeComponent, 
    DocumentosComponent, 
    DadosProfissionaisComponent, 
    OutrasInformacoesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    TextMaskModule,
    MatListModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatPaginatorModule,
    SharedPipesModule,
    MatStepperModule,
    MatDatepickerModule,
    MatCheckboxModule,
    
  ],
  exports:[
    DadosPessoaisComponent,
    EscolaridadeComponent, 
    DocumentosComponent, 
    DadosProfissionaisComponent,
    OutrasInformacoesComponent
  ]
})
export class PessoaFisicaModule { }
