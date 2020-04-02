import { Injectable } from "@angular/core";
// SERVICES
import {
  AuthService,
  ILoginResponse
} from "../../../services/auth/auth.service";

// NGRX
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";

// ACTIONS
import {
  SuccessLoginAction,
  StartLoginAction,
  UserActionTypes,
  VerifyLoginAction,
  FailedLoginAction,
  GetMenuAction,
  LogoutAction,
  SuccessVerifyLoginAction
} from "../../actions/user.actions";

// RXJS
import { Observable, of, throwError } from "rxjs";
import {
  mergeMap,
  map,
  delay,
  tap,
  concatMap,
  catchError
} from "rxjs/operators";

// TYPES
import {
  START_LOGIN,
  LOGOUT,
  VERIFY_LOGIN,
  SUCCESS_LOGIN,
  SUCCESS_VERIFY_LOGIN
} from "../../types/user.types";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppState } from "../../reducers/index.reducer";
import { ContactService } from "../../../services/contact/contact.service";

@Injectable({
  providedIn: "root"
})
export class UserEffects {
  @Effect()
  loginEffect: Observable<Action> = this.actions$.pipe(
    ofType(START_LOGIN),
    concatMap((res: StartLoginAction) => {
      return this.authService
        .loginService(res.payload.username, res.payload.password)
        .pipe(
          map(loginresponse => {
            localStorage.setItem("user", JSON.stringify(loginresponse));
            this.router.navigate(["/projects/all-projects"]);
            return new SuccessLoginAction({
              access_token: loginresponse.access_token,
              token_type: loginresponse.token_type,
              expires_in: loginresponse.expires_in,
              refresh_token: loginresponse.refresh_token,
              username: loginresponse.userName,
              userId: loginresponse.userId,
              userInformation: loginresponse.userInformation,
              expires: loginresponse[".expires"],
              issued: loginresponse[".issued"]
            });
          }),
          catchError(() => of(new FailedLoginAction()))
        );
    })
  );

  // @Effect()
  // getMenuEffect: Observable<Action> = this.actions$.pipe(
  //   ofType(SUCCESS_LOGIN),
  //   concatMap((res: SuccessLoginAction) => {
  //     return this.authService.menuService(res.payload.access_token).pipe(
  //       map(menuResponse => {
  //         localStorage.setItem(
  //           "menuItems",
  //           JSON.stringify(menuResponse.result)
  //         );
  //         this.router.navigate(["/home"]);
  //         return new GetMenuAction({ menuItems: menuResponse.result });
  //       }),
  //       catchError(() => of(new FailedLoginAction()))
  //     );
  //   })
  // );

  @Effect()
  verifyLoginEffect: Observable<Action> = this.actions$.pipe(
    ofType(VERIFY_LOGIN),
    concatMap((res: VerifyLoginAction) => {
      const payload = JSON.parse(
        res.payload.localStorageUserItem
      ) as ILoginResponse;
      if (payload) {
        if (new Date(payload[".expires"]).getTime() > new Date().getTime()) {
          return this.contactService.getAllContactForms(1, 10).pipe(
            map(menuResponse => {
              if (!menuResponse.hasError) {
                return new SuccessVerifyLoginAction({
                  access_token: payload.access_token,
                  token_type: payload.token_type,
                  expires_in: payload.expires_in,
                  refresh_token: payload.refresh_token,
                  username: payload.userName,
                  userId: payload.userId,
                  userInformation: payload.userInformation,
                  expires: payload[".expires"],
                  issued: payload[".issued"]
                });
              } else {
                this.router.navigate(["/auth/login"]);
                return new LogoutAction();
              }
            }),
            catchError(() => {
              this.router.navigate(["/auth/login"]);
              return of(new LogoutAction());
            })
          );
        } else {
          this.router.navigate(["/auth/login"]);
          return of(new LogoutAction());
        }
      } else {
        this.router.navigate(["/auth/login"]);
        return of(new LogoutAction());
      }
    })
  );

  // @Effect()
  // setMenuAfterVerifyLoginEffect: Observable<Action> = this.actions$.pipe(
  //   ofType(SUCCESS_VERIFY_LOGIN),
  //   concatMap((res: SuccessVerifyLoginAction) => {
  //     return of(new GetMenuAction({ menuItems: res.payload.menuItems }));
  //   })
  // );

  @Effect({ dispatch: false })
  logoutEffect: Observable<null> = this.actions$.pipe(
    ofType(LOGOUT),
    delay(500),
    mergeMap(res => {
      localStorage.removeItem("user");
      localStorage.removeItem("menuItems");
      return of(null);
    }),
    tap(() => this.router.navigate(["/auth/login"], { replaceUrl: true }))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
    private http: HttpClient,
    private contactService: ContactService
  ) {}
}
