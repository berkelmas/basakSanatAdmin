import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateBursComponent } from "./create-burs/create-burs.component";
import { UpdateBursComponent } from "./update-burs/update-burs.component";
import { AllBursComponent } from "./all-burs/all-burs.component";
import { DeleteBursComponent } from "./delete-burs/delete-burs.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/scholarships/all-scholarships"
  },
  {
    path: "all-scholarships",
    component: AllBursComponent
  },
  {
    path: "edit-scholarship/:id",
    component: UpdateBursComponent
  },
  {
    path: "create-scholarship",
    component: CreateBursComponent
  },
  {
    path: "delete-scholarship/:id",
    component: DeleteBursComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BurslarRoutingModule {}
