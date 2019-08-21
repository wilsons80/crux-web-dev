import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcessoRoutingModule } from './acesso-routing.module';
import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { ConsultarAcessoComponent } from './consultar-acesso/consultar-acesso.component';
import { DeletarAcessoComponent } from './deletar-acesso/deletar-acesso.component';
import { AlterarAcessoComponent } from './alterar-acesso/alterar-acesso.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatListModule, MatSelectModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ CadastrarAcessoComponent, ConsultarAcessoComponent, DeletarAcessoComponent, AlterarAcessoComponent],
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
    MatCardModule
  ]
})
export class AcessoModule { }
