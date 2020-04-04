import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllIletisimComponent } from "./all-iletisim/all-iletisim.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/contacts/all-contacts",
  },
  {
    path: "all-contacts",
    component: AllIletisimComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IletisimRoutingModule {}
