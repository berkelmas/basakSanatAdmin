import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllProjectsComponent } from "./all-projects/all-projects.component";
import { UpdateProjectComponent } from "./update-project/update-project.component";
import { CreateProjectComponent } from "./create-project/create-project.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/projects/all-projects"
  },
  {
    path: "all-projects",
    component: AllProjectsComponent
  },
  {
    path: "edit-project/:id",
    component: UpdateProjectComponent
  },
  {
    path: "create-project",
    component: CreateProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
