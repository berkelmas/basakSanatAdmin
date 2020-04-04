import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllAtolyeBasvuruComponent } from "./all-atolye-basvuru/all-atolye-basvuru.component";
import { AtolyeBasvuruRoutingModule } from "./atolye-basvuru-routing.module";
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatCardModule,
} from "@angular/material";

@NgModule({
  declarations: [AllAtolyeBasvuruComponent],
  imports: [
    CommonModule,
    AtolyeBasvuruRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class AtolyeBasvuruModule {}
