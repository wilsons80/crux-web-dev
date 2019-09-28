import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatTableModule, MatToolbarModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { CadastrarIniciativasComponent } from './cadastrar-iniciativas/cadastrar-iniciativas.component';
import { IniciativasRoutingModule } from './iniciativas-routing.module';
import { IniciativasComponent } from './iniciativas.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';



@NgModule({
  declarations: [IniciativasComponent, CadastrarIniciativasComponent],
  imports: [
    CommonModule,
    IniciativasRoutingModule,
    MaterialCommonModule
  ]
})
export class IniciativasModule { }
