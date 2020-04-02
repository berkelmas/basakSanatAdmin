import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllProjectsComponent } from "./all-projects/all-projects.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { UpdateProjectComponent } from "./update-project/update-project.component";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { DemoMaterialModule } from "../../demo-material-module";

@NgModule({
  declarations: [
    AllProjectsComponent,
    CreateProjectComponent,
    UpdateProjectComponent
  ],
  imports: [CommonModule, ProjectsRoutingModule, DemoMaterialModule]
})
export class ProjectsModule {}
