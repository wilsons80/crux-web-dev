import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatPaginatorModule, MatTooltipModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { CadastrarEmpresaComponent } from './cadastrar-empresa/cadastrar-empresa.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [EmpresaComponent, CadastrarEmpresaComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialCommonModule
  ]
})
export class EmpresaModule { }
