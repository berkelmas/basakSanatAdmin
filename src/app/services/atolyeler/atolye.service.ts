import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  IGetAllAtolyeResponse,
  ICreateNewAtolyeResponse,
  IGetAtolyeByIdResponse,
  IUpdateAtolyeResponse,
  IDeleteAtolyeResponse,
  IGetAtolyeAppliesResponse,
} from "../../models/atolye/atolye.model";

@Injectable({
  providedIn: "root",
})
export class AtolyeService {
  constructor(private http: HttpClient) {}

  getAllAtolye(): Observable<IGetAllAtolyeResponse> {
    return this.http
      .get<IGetAllAtolyeResponse>("Workplace/GetAll")
      .pipe(catchError((err) => throwError(err)));
  }

  createNewAtolye(
    title: string,
    description: string,
    date: string
  ): Observable<ICreateNewAtolyeResponse> {
    return this.http
      .post<ICreateNewAtolyeResponse>("Workplace/create", {
        title,
        description,
        date,
      })
      .pipe(catchError((err) => throwError(err)));
  }

  getAtolyeById(id: string): Observable<IGetAtolyeByIdResponse> {
    return this.http
      .post<IGetAtolyeByIdResponse>("Workplace/GetById", { id })
      .pipe(catchError((err) => throwError(err)));
  }

  updateAtolye(
    id: string,
    title: string,
    description: string,
    date: string
  ): Observable<IUpdateAtolyeResponse> {
    return this.http
      .post<IUpdateAtolyeResponse>("Workplace/update", {
        id,
        title,
        description,
        date,
      })
      .pipe(catchError((err) => throwError(err)));
  }

  deleteAtolye(id: string): Observable<IDeleteAtolyeResponse> {
    return this.http
      .post<IDeleteAtolyeResponse>("Workplace/Delete", { id })
      .pipe(catchError((err) => throwError(err)));
  }

  getAtolyeApplies(
    pageNumber: number,
    pageSize: number
  ): Observable<IGetAtolyeAppliesResponse> {
    return this.http
      .post<IGetAtolyeAppliesResponse>("Workplace/GetAllApplies", {
        pageNumber,
        pageSize,
      })
      .pipe(catchError((err) => throwError(err)));
  }
}
