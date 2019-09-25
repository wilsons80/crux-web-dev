import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtividadeRoutingModule } from './atividade-routing.module';
import { AtividadeComponent } from './atividade.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatTooltipModule, MatPaginatorModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { MatPaginatedTabHeader } from '@angular/material/tabs/typings/paginated-tab-header';
import { CadastrarAtividadeComponent } from './cadastrar-atividade/cadastrar-atividade.component';


@NgModule({
  declarations: [AtividadeComponent, CadastrarAtividadeComponent],
  imports: [
    CommonModule,
    AtividadeRoutingModule,
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
    MatTooltipModule,
    MatPaginatorModule,
    MatSlideToggleModule,
  ]
})
export class AtividadeModule { }
