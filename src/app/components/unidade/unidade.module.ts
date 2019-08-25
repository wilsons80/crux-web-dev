import { FlexLayoutModule } from '@angular/flex-layout';
import { UnidadeRoutingModule } from './unidade-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatCardModule, MatTableModule } from '@angular/material';
import { UnidadeComponent } from './unidade.component';
import { FormsModule } from '@angular/forms';
import { CadastrarUnidadeComponent } from './cadastrar-unidade/cadastrar-unidade.component';



@NgModule({
  declarations: [EscolherUnidadeComponent, UnidadeComponent, CadastrarUnidadeComponent],
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
    MatTableModule
    
  ]
})
export class UnidadeModule { }
