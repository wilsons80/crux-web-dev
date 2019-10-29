import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatTableModule, MatToolbarModule, MatPaginatorModule, MatTooltipModule, MatStepperModule, MatSlideToggleModule, MatCheckboxModule, MatOptionModule, MatProgressBarModule, MatNativeDateModule, MatAutocompleteModule, MatSortModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { BrowserModule } from '@angular/platform-browser';


const modulos = [
      MatButtonModule
    , MatIconModule
    , MatToolbarModule
    , MatFormFieldModule
    , FormsModule
    , MatInputModule
    , MatSelectModule
    , MatCardModule
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
    , MatAutocompleteModule
    , MatTableModule
    , MatSortModule
    , BrowserModule
]

@NgModule({
  declarations: [],
  imports: [modulos],
  exports:[modulos]
})
export class MaterialCommonModule { }
