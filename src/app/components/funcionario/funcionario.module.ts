import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatTooltipModule, MatPaginatorModule, MatStepperModule, MatDatepickerModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PessoaFisicaModule } from '../common/pessoa-fisica/pessoa-fisica.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [FuncionarioComponent, CadastrarFuncionarioComponent],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    PessoaFisicaModule,
    MaterialCommonModule
  ]
})
export class FuncionarioModule { }
