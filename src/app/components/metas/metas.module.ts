import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetasRoutingModule } from './metas-routing.module';
import { MetasComponent } from './metas.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { CadastrarMetasComponent } from './cadastrar-metas/cadastrar-metas.component';


@NgModule({
  declarations: [MetasComponent, CadastrarMetasComponent],
  imports: [
    CommonModule,
    MetasRoutingModule,
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
export class MetasModule { }
