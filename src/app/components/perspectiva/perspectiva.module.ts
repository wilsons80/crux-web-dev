import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerspectivaRoutingModule } from './perspectiva-routing.module';
import { PerspectivaComponent } from './perspectiva.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [PerspectivaComponent],
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
    FlexLayoutModule
  ]
})
export class PerspectivaModule { }
