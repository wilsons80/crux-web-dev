import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule, MatDatepickerModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [
    ProdutoComponent
   ,CadastrarProdutoComponent
  
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    MaterialCommonModule
  ]
})
export class ProdutoModule { }
