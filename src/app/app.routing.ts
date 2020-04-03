import { Routes } from "@angular/router";

import { FullComponent } from "./layouts/full/full.component";
import { AppBlankComponent } from "./layouts/blank/blank.component";

export const AppRoutes: Routes = [
  {
    path: "auth",
    loadChildren: "./pages/auth/auth.module#AuthModule"
  },
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "",
        redirectTo: "/projects/all-projects",
        pathMatch: "full"
      },
      {
        path: "projects",
        loadChildren: "./pages/projects/projects.module#ProjectsModule"
      },
      {
        path: "scholarships",
        loadChildren: "./pages/burslar/burslar.module#BurslarModule"
      },
      {
        path: "announcements",
        loadChildren: "./pages/duyuru/duyuru.module#DuyuruModule"
      }
    ]
  },
  // {
  //   path: "",
  //   component: AppBlankComponent,
  //   children: [
  //     {
  //       path: "authentication",
  //       loadChildren:
  //         "./authentication/authentication.module#AuthenticationModule"
  //     }
  //   ]
  // },
  {
    path: "**",
    redirectTo: "authentication/404"
  }
];
