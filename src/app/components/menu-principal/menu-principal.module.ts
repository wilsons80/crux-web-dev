import { TempoSessaoModule } from './../tempo-sessao/tempo-sessao.module';
import { ModuloPedagogicoComponent } from './modulo-pedagogico/modulo-pedagogico.component';
import { ModuloAdministrativoComponent } from './modulo-administrativo/modulo-administrativo.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatTooltipModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MenuConfiguracoesComponent } from './menu-configuracoes/menu-configuracoes.component';
import { MenuPrincipalComponent } from './menu-principal.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { MenuOrganizacaoInternaComponent } from './menu-organizacao-interna/menu-organizacao-interna.component';
import { MenuEstrategicoComponent } from './menu-estrategico/menu-estrategico.component';
import { MenuGestaoPessoasComponent } from './menu-gestao-pessoas/menu-gestao-pessoas.component';
import { MenuSecretariaComponent } from './menu-secretaria/menu-secretaria.component';
import { MenuSapComponent } from './menu-sap/menu-sap.component';
import { MenuPedagogicoComponent } from './menu-pedagogico/menu-pedagogico.component';
import { TbReferenciaGestaoPessoasComponent } from './menu-gestao-pessoas/tb-referencia-gestao-pessoas/tb-referencia-gestao-pessoas.component';
import { TbReferenciaSecretariaComponent } from './menu-secretaria/tb-referencia-secretaria/tb-referencia-secretaria.component';
import { TbReferenciaSapComponent } from './menu-sap/tb-referencia-sap/tb-referencia-sap.component';
import { TbReferenciaOrganizacaoInternaComponent } from './menu-organizacao-interna/tb-referencia-organizacao-interna/tb-referencia-organizacao-interna.component';
import { MenuProgramaProjetoComponent } from './menu-programa-projeto/menu-programa-projeto.component';



@NgModule({
  declarations: [
    MenuPrincipalComponent,
    MenuConfiguracoesComponent,
    SubMenuComponent,
    ModuloAdministrativoComponent,
    ModuloPedagogicoComponent,
    MenuOrganizacaoInternaComponent,
    MenuEstrategicoComponent,
    MenuGestaoPessoasComponent,
    MenuSecretariaComponent,
    MenuSapComponent,
    MenuPedagogicoComponent,
    TbReferenciaGestaoPessoasComponent,
    TbReferenciaSecretariaComponent,
    TbReferenciaSapComponent,
    TbReferenciaOrganizacaoInternaComponent,
    MenuProgramaProjetoComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    RouterModule,
    MatTooltipModule,
    TempoSessaoModule,
    MatToolbarModule

  ],
  exports: [MenuPrincipalComponent]
})
export class MenuPrincipalModule { }
