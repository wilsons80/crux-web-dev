import { VulnerabilidadeFamiliarComponent } from './vulnerabilidade-familiar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VulnerabilidadeFamiliarRoutingModule } from './vulnerabilidade-familiar-routing.module';
import { CadastrarVulnerabilidadeFamiliarComponent } from './cadastrar-vulnerabilidade-familiar/cadastrar-vulnerabilidade-familiar.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [VulnerabilidadeFamiliarComponent, CadastrarVulnerabilidadeFamiliarComponent],
  imports: [
    CommonModule,
    VulnerabilidadeFamiliarRoutingModule,
    MaterialCommonModule
  ]
})
export class VulnerabilidadeFamiliarModule { }
