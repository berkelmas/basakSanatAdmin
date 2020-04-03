import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BurslarRoutingModule } from "./burslar-routing.module";
import { AllBursComponent } from "./all-burs/all-burs.component";
import { CreateBursComponent } from "./create-burs/create-burs.component";
import { UpdateBursComponent } from "./update-burs/update-burs.component";
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTooltipModule,
  MatButtonModule,
  MatSnackBarModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { DeleteBursComponent } from './delete-burs/delete-burs.component';

@NgModule({
  declarations: [AllBursComponent, CreateBursComponent, UpdateBursComponent, DeleteBursComponent],
  imports: [
    CommonModule,
    BurslarRoutingModule,
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
    CKEditorModule
  ]
})
export class BurslarModule {}
