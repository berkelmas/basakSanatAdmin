import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllAtolyelerComponent } from "./all-atolyeler/all-atolyeler.component";
import { CreateAtolyeComponent } from "./create-atolye/create-atolye.component";
import { UpdateAtolyeComponent } from "./update-atolye/update-atolye.component";
import { DeleteAtolyeComponent } from "./delete-atolye/delete-atolye.component";
import { AtolyeRoutingModule } from "./atolyeler-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
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
  declarations: [
    AllAtolyelerComponent,
    CreateAtolyeComponent,
    UpdateAtolyeComponent,
    DeleteAtolyeComponent,
  ],
  imports: [
    CommonModule,
    AtolyeRoutingModule,
    ReactiveFormsModule,
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
export class AtolyelerModule {}
