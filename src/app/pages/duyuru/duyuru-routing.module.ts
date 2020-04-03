import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateDuyuruComponent } from "./create-duyuru/create-duyuru.component";
import { UpdateDuyuruComponent } from "./update-duyuru/update-duyuru.component";
import { AllDuyuruComponent } from "./all-duyuru/all-duyuru.component";
import { DeleteDuyuruComponent } from "./delete-duyuru/delete-duyuru.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/announcements/all-announcements"
  },
  {
    path: "all-announcements",
    component: AllDuyuruComponent
  },
  {
    path: "edit-announcement/:id",
    component: UpdateDuyuruComponent
  },
  {
    path: "delete-announcement/:id",
    component: DeleteDuyuruComponent
  },
  {
    path: "create-announcement",
    component: CreateDuyuruComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuyuruRoutingModule {}
