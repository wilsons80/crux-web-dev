import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanosAcaoRoutingModule } from './planos-acao-routing.module';
import { CadastrarPlanosAcaoComponent } from './cadastrar-planos-acao/cadastrar-planos-acao.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { PlanosAcaoComponent } from './planos-acao.component';


@NgModule({
  declarations: [PlanosAcaoComponent, CadastrarPlanosAcaoComponent],
  imports: [
    CommonModule,
    PlanosAcaoRoutingModule,
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
    SharedPipesModule,
    MatDatepickerModule
  ]
})
export class PlanosAcaoModule { }
