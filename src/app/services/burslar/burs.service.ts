import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  IGetAllBursResponse,
  ICreateNewBursResponse,
  IUpdateBursResponse,
  IDeleteBursResponse,
  IGetBursByIdResponse,
  IGetBursAppliesResponse,
} from "../../models/burslar/burs.model";

@Injectable({
  providedIn: "root",
})
export class BursService {
  constructor(private http: HttpClient) {}

  getAllBurs(): Observable<IGetAllBursResponse> {
    return this.http
      .get<IGetAllBursResponse>("Scholarship/GetAll")
      .pipe(catchError((err) => throwError(err)));
  }

  createNewBurs(
    title: string,
    summary: string,
    description: string
  ): Observable<ICreateNewBursResponse> {
    return this.http
      .post<ICreateNewBursResponse>("Scholarship/create", {
        title,
        description,
        summary,
      })
      .pipe(catchError((err) => throwError(err)));
  }

  getBursById(id: string): Observable<IGetBursByIdResponse> {
    return this.http
      .post<IGetBursByIdResponse>("Scholarship/GetById", { id })
      .pipe(catchError((err) => throwError(err)));
  }

  updateBurs(
    id: string,
    title: string,
    summary: string,
    description: string
  ): Observable<IUpdateBursResponse> {
    return this.http
      .post<IUpdateBursResponse>("Scholarship/update", {
        id,
        title,
        summary,
        description,
      })
      .pipe(catchError((err) => throwError(err)));
  }

  deleteBurs(id: string): Observable<IDeleteBursResponse> {
    return this.http
      .post<IDeleteBursResponse>("Scholarship/Delete", { id })
      .pipe(catchError((err) => throwError(err)));
  }

  getBursApplies(
    pageNumber: number,
    pageSize: number
  ): Observable<IGetBursAppliesResponse> {
    return this.http
      .post<IGetBursAppliesResponse>("Scholarship/GetAllApplies", {
        pageNumber,
        pageSize,
      })
      .pipe(catchError((err) => throwError(err)));
  }
}
