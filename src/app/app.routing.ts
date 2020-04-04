import { Routes } from "@angular/router";

import { FullComponent } from "./layouts/full/full.component";
import { AppBlankComponent } from "./layouts/blank/blank.component";

export const AppRoutes: Routes = [
  {
    path: "auth",
    loadChildren: "./pages/auth/auth.module#AuthModule",
  },
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "",
        redirectTo: "/projects/all-projects",
        pathMatch: "full",
      },
      {
        path: "projects",
        loadChildren: "./pages/projects/projects.module#ProjectsModule",
      },
      {
        path: "scholarships",
        loadChildren: "./pages/burslar/burslar.module#BurslarModule",
      },
      {
        path: "scholarships-apply",
        loadChildren:
          "./pages/burs-basvuru/burs-basvuru.module#BursBasvuruModule",
      },
      {
        path: "announcements",
        loadChildren: "./pages/duyuru/duyuru.module#DuyuruModule",
      },
      {
        path: "workshops",
        loadChildren: "./pages/atolyeler/atolyeler.module#AtolyelerModule",
      },
      {
        path: "workshops-apply",
        loadChildren:
          "./pages/atolye-basvuru/atolye-basvuru.module#AtolyeBasvuruModule",
      },
      {
        path: "contacts",
        loadChildren: "./pages/iletisim/iletisim.module#IletisimModule",
      },
    ],
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
    redirectTo: "authentication/404",
  },
];
