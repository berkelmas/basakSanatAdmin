import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { IGetAllContactFormsResponse } from "../../models/contact/contact.model";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getAllContactForms(
    pageNumber: number,
    pageSize: number
  ): Observable<IGetAllContactFormsResponse> {
    return this.http
      .post<IGetAllContactFormsResponse>("Contact/GetAll", {
        pageNumber,
        pageSize
      })
      .pipe(catchError(err => throwError(err)));
  }
}
