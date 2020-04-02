import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = localStorage.getItem("user");

    if (user) {
      const accessToken = JSON.parse(user)["access_token"];
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + accessToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
