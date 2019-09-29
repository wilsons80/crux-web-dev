import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatTableModule, MatToolbarModule, MatPaginatorModule, MatTooltipModule, MatStepperModule, MatSlideToggleModule, MatCheckboxModule, MatOptionModule, MatProgressBarModule, MatNativeDateModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';


const modulos = [
      MatButtonModule
    , MatIconModule
    , MatToolbarModule
    , MatFormFieldModule
    , FormsModule
    , MatInputModule
    , MatSelectModule
    , MatCardModule
    , MatTableModule
    , TextMaskModule
    , MatListModule
    , FlexLayoutModule
    , SharedPipesModule
    , MatDatepickerModule
    , MatPaginatorModule
    , MatTooltipModule
    , MatStepperModule
    , MatSlideToggleModule
    , MatCheckboxModule
    , MatOptionModule
    , ReactiveFormsModule
    , MatProgressBarModule
    , MatNativeDateModule

]

@NgModule({
  declarations: [],
  imports: [modulos],
  exports:[modulos]
})
export class MaterialCommonModule { }
