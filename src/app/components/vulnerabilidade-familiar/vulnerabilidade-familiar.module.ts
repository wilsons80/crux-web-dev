import { VulnerabilidadeFamiliarComponent } from './vulnerabilidade-familiar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VulnerabilidadeFamiliarRoutingModule } from './vulnerabilidade-familiar-routing.module';
import { CadastrarVulnerabilidadeFamiliarComponent } from './cadastrar-vulnerabilidade-familiar/cadastrar-vulnerabilidade-familiar.component';


@NgModule({
  declarations: [VulnerabilidadeFamiliarComponent, CadastrarVulnerabilidadeFamiliarComponent],
  imports: [
    CommonModule,
    VulnerabilidadeFamiliarRoutingModule
  ]
})
export class VulnerabilidadeFamiliarModule { }
