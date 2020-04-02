import * as $ from "jquery";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { AppRoutes } from "./app.routing";
import { AppComponent } from "./app.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { FullComponent } from "./layouts/full/full.component";
import { AppBlankComponent } from "./layouts/blank/blank.component";
import { AppHeaderComponent } from "./layouts/full/header/header.component";
import { AppSidebarComponent } from "./layouts/full/sidebar/sidebar.component";
import { AppBreadcrumbComponent } from "./layouts/full/breadcrumb/breadcrumb.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./demo-material-module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { SharedModule } from "./shared/shared.module";
import { SpinnerComponent } from "./shared/spinner.component";

// NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// REDUCERS
import { rootReducer } from "./store/reducers/index.reducer";

// EFFECTS
import { AppEffects } from "./store/effects/app.effects";
import { UserEffects } from "./store/effects/user/user.effects";

// NGRX STATES
import { UserState } from "./store/reducers/user/user.reducer";
import { GeneralInterceptor } from "./interceptors/general.interceptor";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

// GLOBAL NGRX STATE
export interface GlobalState {
  user: UserState;
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    AppSidebarComponent,
    AppBreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    SharedModule,
    StoreModule.forRoot(rootReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    }),
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
