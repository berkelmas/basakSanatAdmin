import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IGetAllProjelerResponse } from "../../models/projeler/projeler.model";

@Injectable({
  providedIn: "root"
})
export class ProjelerService {
  constructor(private http: HttpClient) {}

  getAllProjeler(
    pageNumber: number,
    pageSize: number
  ): Observable<IGetAllProjelerResponse> {
    return this.http
      .post<IGetAllProjelerResponse>("Project/GetAll", {
        pageNumber,
        pageSize
      })
      .pipe(catchError(err => throwError(err)));
  }
}
