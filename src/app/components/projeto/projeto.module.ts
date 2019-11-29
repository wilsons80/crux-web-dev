import { UnidadesMultiplasModule } from './../common/unidades-multiplas/unidades-multiplas.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoComponent } from './projeto.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { CadastrarProjetoComponent } from './cadastrar-projeto/cadastrar-projeto.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosProjetoComponent } from './cadastrar-projeto/dados-projeto/dados-projeto.component';
import { UnidadesProjetoComponent } from './cadastrar-projeto/unidades-projeto/unidades-projeto.component';
import { ColaboradoresProjetoComponent } from './cadastrar-projeto/colaboradores-projeto/colaboradores-projeto.component';
import { ParceriasProjetoComponent } from './cadastrar-projeto/parcerias-projeto/parcerias-projeto.component';
import { ComposicaoRhProjetoComponent } from './cadastrar-projeto/composicao-rh-projeto/composicao-rh-projeto.component';
import { MateriaisProjetoComponent } from './cadastrar-projeto/materiais-projeto/materiais-projeto.component';


@NgModule({
  declarations: [ProjetoComponent, CadastrarProjetoComponent, DadosProjetoComponent, UnidadesProjetoComponent, ColaboradoresProjetoComponent, ParceriasProjetoComponent, ComposicaoRhProjetoComponent, MateriaisProjetoComponent],
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    MaterialCommonModule,
    UnidadesMultiplasModule
  ]
})
export class ProjetoModule { }
