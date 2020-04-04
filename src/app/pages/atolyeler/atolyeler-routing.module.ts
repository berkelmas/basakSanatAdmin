import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllAtolyelerComponent } from "./all-atolyeler/all-atolyeler.component";
import { UpdateAtolyeComponent } from "./update-atolye/update-atolye.component";
import { CreateAtolyeComponent } from "./create-atolye/create-atolye.component";
import { DeleteAtolyeComponent } from "./delete-atolye/delete-atolye.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/workshops/all-workshops",
  },
  {
    path: "all-workshops",
    component: AllAtolyelerComponent,
  },
  {
    path: "edit-workshop/:id",
    component: UpdateAtolyeComponent,
  },
  {
    path: "create-workshop",
    component: CreateAtolyeComponent,
  },
  {
    path: "delete-workshop/:id",
    component: DeleteAtolyeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtolyeRoutingModule {}
