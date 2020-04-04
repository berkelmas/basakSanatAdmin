import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllAtolyeBasvuruComponent } from "./all-atolye-basvuru/all-atolye-basvuru.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/workshops-apply/all-workshop-apply",
  },
  {
    path: "all-workshop-apply",
    component: AllAtolyeBasvuruComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtolyeBasvuruRoutingModule {}
