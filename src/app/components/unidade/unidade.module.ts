import { FlexLayoutModule } from '@angular/flex-layout';
import { UnidadeRoutingModule } from './unidade-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatTooltipModule } from '@angular/material';
import { UnidadeComponent } from './unidade.component';
import { FormsModule } from '@angular/forms';
import { CadastrarUnidadeComponent } from './cadastrar-unidade/cadastrar-unidade.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [
      EscolherUnidadeComponent
    , UnidadeComponent
    , CadastrarUnidadeComponent
  ],
  imports: [
    CommonModule,
    UnidadeRoutingModule,
    MaterialCommonModule
  ],

})
export class UnidadeModule { }
