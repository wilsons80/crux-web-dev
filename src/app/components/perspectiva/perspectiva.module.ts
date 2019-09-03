import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerspectivaRoutingModule } from './perspectiva-routing.module';
import { PerspectivaComponent } from './perspectiva.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CadastrarPerspectivaComponent } from './cadastrar-perspectiva/cadastrar-perspectiva.component';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';


@NgModule({
  declarations: [PerspectivaComponent, CadastrarPerspectivaComponent],
  imports: [
    CommonModule,
    PerspectivaRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    SharedPipesModule
  ]
})
export class PerspectivaModule { }
