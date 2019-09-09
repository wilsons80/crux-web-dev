import { FlexLayoutModule } from '@angular/flex-layout';
import { UnidadeRoutingModule } from './unidade-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule } from '@angular/material';
import { UnidadeComponent } from './unidade.component';
import { FormsModule } from '@angular/forms';
import { CadastrarUnidadeComponent } from './cadastrar-unidade/cadastrar-unidade.component';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
      EscolherUnidadeComponent
    , UnidadeComponent
    , CadastrarUnidadeComponent
  ],
  imports: [
    CommonModule,
    UnidadeRoutingModule,
    FlexLayoutModule,
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
    MatListModule
  ],

})
export class UnidadeModule { }
