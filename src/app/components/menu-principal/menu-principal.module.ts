import { TempoSessaoModule } from './../tempo-sessao/tempo-sessao.module';
import { ModuloPedagogicoComponent } from './modulo-pedagogico/modulo-pedagogico.component';
import { ModuloAdministrativoComponent } from './modulo-administrativo/modulo-administrativo.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MenuConfiguracoesComponent } from './menu-configuracoes/menu-configuracoes.component';
import { MenuPrincipalComponent } from './menu-principal.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';



@NgModule({
  declarations: [
    MenuPrincipalComponent,
    MenuConfiguracoesComponent,
    SubMenuComponent,
    ModuloAdministrativoComponent,
    ModuloPedagogicoComponent,
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
    TempoSessaoModule

  ],
  exports: [MenuPrincipalComponent]
})
export class MenuPrincipalModule { }
