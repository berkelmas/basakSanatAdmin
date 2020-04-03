import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllDuyuruComponent } from "./all-duyuru/all-duyuru.component";
import { CreateDuyuruComponent } from "./create-duyuru/create-duyuru.component";
import { UpdateDuyuruComponent } from "./update-duyuru/update-duyuru.component";
import { DuyuruRoutingModule } from "./duyuru-routing.module";
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatSnackBarModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { DeleteDuyuruComponent } from './delete-duyuru/delete-duyuru.component';

@NgModule({
  declarations: [
    AllDuyuruComponent,
    CreateDuyuruComponent,
    UpdateDuyuruComponent,
    DeleteDuyuruComponent
  ],
  imports: [
    CommonModule,
    DuyuruRoutingModule,
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
    MatTooltipModule
  ]
})
export class DuyuruModule {}
