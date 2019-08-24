import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcessoRoutingModule } from './acesso-routing.module';
import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatListModule, MatSelectModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AcessoComponent } from './acesso.component';


@NgModule({
  declarations: [ CadastrarAcessoComponent, AcessoComponent],
  entryComponents: [CadastrarAcessoComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AcessoModule { }
