import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "../reducers/user/user.reducer";

// USER REDUCER STATE SELECTOR.
export const selectUser = createFeatureSelector<UserState>("user");

// LOADING VARIABLE SELECTOR IN USER REDUCER.
export const selectloginLoading = createSelector(
  selectUser,
  state => state.loginLoading
);

// VERIFY LOGIN LOADING SELECTOR
export const selectVerifyLoginLoading = createSelector(
  selectUser,
  state => state.verifyLoginLoading
);

// LOGIN FAILED STATE SELECTOR
export const selectloginFailed = createSelector(
  selectUser,
  state => state.loginFailed
);

// USERNAME VARIABLE SELECTOR IN USER REDUCER.
export const selectUserUsername = createSelector(
  selectUser,
  state => state.userName
);

// ACCESS TOKEN SELECTOR
export const selectAccessToken = createSelector(
  selectUser,
  state => state.access_token
);

// MENU ITEMS SELECTOR
export const selectUserMenu = createSelector(
  selectUser,
  state => state.userMenu
);

// FULLNAME SELECTOR
export const selectFullName = createSelector(
  selectUser,
  state => state.userInformation
);
