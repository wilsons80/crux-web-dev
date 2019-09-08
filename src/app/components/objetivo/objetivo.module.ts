import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatTableModule, MatToolbarModule, MatButtonModule, MatDatepickerModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { ObjetivoRoutingModule } from './objetivo-routing.module';
import { ObjetivoComponent } from './objetivo.component';
import { CadastrarObjetivoComponent } from './cadastrar-objetivo/cadastrar-objetivo.component';



@NgModule({
  declarations: [ObjetivoComponent, CadastrarObjetivoComponent],
  imports: [
    CommonModule,
    ObjetivoRoutingModule,
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
    MatDatepickerModule
  ]
})
export class ObjetivoModule { }