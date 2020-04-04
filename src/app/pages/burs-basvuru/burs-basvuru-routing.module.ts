import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllBursBasvuruComponent } from "./all-burs-basvuru/all-burs-basvuru.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/scholarships-apply/all-scholarship-apply",
  },
  {
    path: "all-scholarship-apply",
    component: AllBursBasvuruComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BursBasvuruRoutingModule {}
