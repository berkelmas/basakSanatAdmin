import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllBursBasvuruComponent } from "./all-burs-basvuru/all-burs-basvuru.component";
import { BursBasvuruRoutingModule } from "./burs-basvuru-routing.module";
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatCardModule,
} from "@angular/material";

@NgModule({
  declarations: [AllBursBasvuruComponent],
  imports: [
    CommonModule,
    BursBasvuruRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class BursBasvuruModule {}
