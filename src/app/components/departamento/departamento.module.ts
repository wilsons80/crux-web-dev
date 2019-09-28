import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatTableModule, MatToolbarModule, MatTooltipModule, MatPaginatorModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CadastrarDepartamentoComponent } from './cadastrar-departamento/cadastrar-departamento.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';



@NgModule({
  declarations: [
    DepartamentoComponent,
    CadastrarDepartamentoComponent,
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    MaterialCommonModule
  ],
  exports: []
})
export class DepartamentoModule { }
