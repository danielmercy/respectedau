import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { 
  MatBottomSheetModule,
  MatGridListModule,
  MatSidenavModule,
  MatTooltipModule,
  MatStepperModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule 
} from "@angular/material";
import 'hammerjs'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatInputModule,   
    MatMenuModule,
    MatListModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule, 
    MatBadgeModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatStepperModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatFormFieldModule
  ],
  exports: [
    MatInputModule,     
    MatMenuModule,
    MatListModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule, 
    MatBadgeModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatStepperModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }


