import {
  START_LOGIN,
  SUCCESS_LOGIN,
  FAILED_LOGIN,
  LOGOUT,
  VERIFY_LOGIN,
  GET_MENU,
  SUCCESS_VERIFY_LOGIN
} from "../types/user.types";
import { Action } from "@ngrx/store";

export class StartLoginAction implements Action {
  readonly type: string = START_LOGIN;

  constructor(
    public payload: {
      username: string;
      password: string;
    }
  ) {}
}

export class SuccessLoginAction implements Action {
  readonly type: string = SUCCESS_LOGIN;

  constructor(
    public payload: {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      username: string;
      userId: string;
      userInformation: string;
      expires: Date;
      issued: Date;
    }
  ) {}
}

export class FailedLoginAction implements Action {
  readonly type: string = FAILED_LOGIN;

  constructor() {}
}

export class VerifyLoginAction implements Action {
  readonly type: string = VERIFY_LOGIN;

  constructor(
    public payload: {
      localStorageUserItem: string;
      currentPath: string;
    }
  ) {}
}

export class SuccessVerifyLoginAction implements Action {
  readonly type: string = SUCCESS_VERIFY_LOGIN;

  constructor(
    public payload: {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      username: string;
      userId: string;
      userInformation: string;
      expires: Date;
      issued: Date;
    }
  ) {}
}

export class LogoutAction implements Action {
  readonly type: string = LOGOUT;

  constructor() {}
}

export class GetMenuAction implements Action {
  readonly type: string = GET_MENU;

  constructor(
    public payload: {
      menuItems: {
        [index: number]: { functionName: string };
      };
    }
  ) {}
}

export type UserActionTypes =
  | SuccessLoginAction
  | FailedLoginAction
  | StartLoginAction
  | LogoutAction
  | VerifyLoginAction
  | GetMenuAction;
