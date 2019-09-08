import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CadastrarDepartamentoComponent } from './cadastrar-departamento/cadastrar-departamento.component';



@NgModule({
  declarations: [
    DepartamentoComponent,
    CadastrarDepartamentoComponent,
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
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
    MatTooltipModule
  ],
  exports: []
})
export class DepartamentoModule { }
