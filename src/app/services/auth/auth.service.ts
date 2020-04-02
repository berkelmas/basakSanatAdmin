import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  userName: string;
  userId: string;
  userInformation: string;
  ".expires": Date;
  ".issued": Date;
}

export interface IMenuResponse {
  message: string;
  hasError: boolean;
  hasSuccessMessage: boolean;
  resultCount: number;
  rowCount: number;
  result: {
    [index: number]: { functionName: string };
  };
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginService(username, password): Observable<ILoginResponse> {
    const body = new HttpParams()
      .set("username", username)
      .set("password", password)
      .set("grant_type", "password")
      .set("client_id", "345e1927a3214f68abc79f2183837fd1");
    return this.http.post<ILoginResponse>("token", body.toString(), {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }

  // menuService(token): Observable<IMenuResponse> {
  //   return this.http.get<IMenuResponse>("MenuAuthorization/GetUserMenu", {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // }
}
