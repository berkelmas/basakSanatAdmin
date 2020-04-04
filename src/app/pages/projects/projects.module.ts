import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllProjectsComponent } from "./all-projects/all-projects.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { UpdateProjectComponent } from "./update-project/update-project.component";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { DemoMaterialModule } from "../../demo-material-module";
import { ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { DeleteProjectComponent } from './delete-project/delete-project.component';

@NgModule({
  declarations: [
    AllProjectsComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    DeleteProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    DemoMaterialModule
  ]
})
export class ProjectsModule {}
