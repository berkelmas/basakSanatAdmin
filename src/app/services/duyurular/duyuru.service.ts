import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  IGetAllDuyuruResponse,
  IGetDuyuruByIdResponse,
  IUpdateDuyuruResponse,
  ICreateDuyuruResponse,
  IDeleteDuyuruResponse
} from "../../models/duyuru/duyuru.model";

@Injectable({
  providedIn: "root"
})
export class DuyuruService {
  constructor(private http: HttpClient) {}

  getAllDuyuru(
    pageNumber: number,
    pageSize: number
  ): Observable<IGetAllDuyuruResponse> {
    return this.http
      .post<IGetAllDuyuruResponse>("Notice/GetAll", {
        pageNumber,
        pageSize
      })
      .pipe(catchError(err => throwError(err)));
  }

  getDuyuruById(id: string): Observable<IGetDuyuruByIdResponse> {
    return this.http
      .post<IGetDuyuruByIdResponse>("Notice/GetById", { id })
      .pipe(catchError(err => throwError(err)));
  }

  updateDuyuru(
    id: string,
    title: string,
    description: string
  ): Observable<IUpdateDuyuruResponse> {
    return this.http
      .post<IUpdateDuyuruResponse>("Notice/update", { id, title, description })
      .pipe(catchError(err => throwError(err)));
  }

  createDuyuru(
    title: string,
    description: string
  ): Observable<ICreateDuyuruResponse> {
    return this.http
      .post<ICreateDuyuruResponse>("Notice/create", { title, description })
      .pipe(catchError(err => throwError(err)));
  }

  deleteDuyuru(id: string): Observable<IDeleteDuyuruResponse> {
    return this.http
      .post<IDeleteDuyuruResponse>("Notice/Delete", { id })
      .pipe(catchError(err => throwError(err)));
  }
}
