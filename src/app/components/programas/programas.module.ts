import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramasRoutingModule } from './programas-routing.module';
import { ProgramasComponent } from './programas.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { CadastrarProgramasComponent } from './cadastrar-programas/cadastrar-programas.component';


@NgModule({
  declarations: [ProgramasComponent, CadastrarProgramasComponent],
  imports: [
    CommonModule,
    ProgramasRoutingModule,
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
    MatDatepickerModule,
    MatPaginatorModule,
    MatTooltipModule
  ]
})
export class ProgramasModule { }
