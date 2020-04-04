import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllIletisimComponent } from "./all-iletisim/all-iletisim.component";
import { IletisimRoutingModule } from "./iletisim-routing.module";
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatTooltipModule,
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [AllIletisimComponent],
  imports: [
    CommonModule,
    IletisimRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatTooltipModule,
  ],
})
export class IletisimModule {}
