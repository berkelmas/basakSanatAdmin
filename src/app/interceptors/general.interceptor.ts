import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url === "token") {
      request = request.clone({
        url: environment.tokenEndpoint
      });
    } else {
      request = request.clone({
        url: `${environment.apiEndpoint}${request.url}`
      });
    }
    return next.handle(request);
  }
}
