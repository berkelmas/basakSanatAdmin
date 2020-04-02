import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginScreenComponent } from "./login-screen/login-screen.component";

export const AuthRoutes: Routes = [
  {
    path: "login",
    component: LoginScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
