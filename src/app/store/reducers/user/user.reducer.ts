import {
  START_LOGIN,
  SUCCESS_LOGIN,
  FAILED_LOGIN,
  START_LOGIN_LOADING,
  LOGOUT,
  GET_MENU,
  SUCCESS_VERIFY_LOGIN,
  VERIFY_LOGIN
} from "../../types/user.types";
import { ILoginResponse } from "../../../services/auth/auth.service";

import {
  UserActionTypes,
  SuccessLoginAction,
  GetMenuAction,
  SuccessVerifyLoginAction
} from "../../actions/user.actions";

const initialState: UserState = {
  access_token: null,
  token_type: null,
  expires_in: null,
  refresh_token: null,
  userName: null,
  userId: null,
  userInformation: null,
  ".expires": null,
  ".issued": null,

  userMenu: [],

  loginLoading: false,
  loginFailed: false,
  verifyLoginLoading: false
};

export interface UserState extends ILoginResponse {
  loginLoading: boolean;
  loginFailed: boolean;
  verifyLoginLoading: boolean;
  userMenu: {
    [index: number]: { functionName: string };
  };
}

export function UserReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case START_LOGIN:
      return { ...state, loginLoading: true, loginFailed: false };
    case SUCCESS_LOGIN:
      return {
        ...state,
        access_token: (action as SuccessLoginAction).payload.access_token,
        token_type: (action as SuccessLoginAction).payload.token_type,
        expires_in: (action as SuccessLoginAction).payload.expires_in,
        refresh_token: (action as SuccessLoginAction).payload.refresh_token,
        username: (action as SuccessLoginAction).payload.username,
        userId: (action as SuccessLoginAction).payload.userId,
        userInformation: (action as SuccessLoginAction).payload.userInformation,
        ".expires": (action as SuccessLoginAction).payload.expires,
        ".issued": (action as SuccessLoginAction).payload.issued,
        loginLoading: false
      };
    case FAILED_LOGIN:
      return {
        ...state,
        loginFailed: true,
        loginLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        access_token: null,
        token_type: null,
        expires_in: null,
        refresh_token: null,
        username: null,
        userId: null,
        userInformation: null,
        userEmail: null,
        userImage: null,
        userGroup: null,
        userHospitalName: null,
        startWorkDate: null,
        ".expires": null,
        ".issued": null,

        loginLoading: false,
        loginFailed: false,
        verifyLoginLoading: false
      };
    case VERIFY_LOGIN:
      return {
        ...state,
        verifyLoginLoading: true
      };
    case SUCCESS_VERIFY_LOGIN:
      return {
        ...state,
        access_token: (action as SuccessVerifyLoginAction).payload.access_token,
        token_type: (action as SuccessVerifyLoginAction).payload.token_type,
        expires_in: (action as SuccessVerifyLoginAction).payload.expires_in,
        refresh_token: (action as SuccessVerifyLoginAction).payload
          .refresh_token,
        username: (action as SuccessVerifyLoginAction).payload.username,
        userId: (action as SuccessVerifyLoginAction).payload.userId,
        userInformation: (action as SuccessVerifyLoginAction).payload
          .userInformation,
        ".expires": (action as SuccessVerifyLoginAction).payload.expires,
        ".issued": (action as SuccessVerifyLoginAction).payload.issued
      };
    case GET_MENU:
      return {
        ...state,
        loginLoading: false,
        verifyLoginLoading: false,
        userMenu: (action as GetMenuAction).payload.menuItems
      };
    default:
      return state;
  }
}
