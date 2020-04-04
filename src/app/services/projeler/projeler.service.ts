import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  IGetAllProjelerResponse,
  ICreateProjectResponse,
  IUpdateProjectResponse,
  IGetProjectByIdResponse,
  IDeleteProjectResponse
} from "../../models/projeler/projeler.model";

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

  createNewProject(
    title: string,
    summary: string,
    content: string,
    image: string
  ): Observable<ICreateProjectResponse> {
    return this.http
      .post<ICreateProjectResponse>("Project/create", {
        title,
        summary,
        content,
        image
      })
      .pipe(catchError(err => throwError(err)));
  }

  updateProject(
    id: string,
    title: string,
    summary: string,
    content: string,
    image: string
  ): Observable<IUpdateProjectResponse> {
    return this.http
      .post<IUpdateProjectResponse>("Project/update", {
        id,
        title,
        summary,
        content,
        image
      })
      .pipe(catchError(err => throwError(err)));
  }

  getProjectById(id: string): Observable<IGetProjectByIdResponse> {
    return this.http
      .post<IGetProjectByIdResponse>("Project/GetById", { id })
      .pipe(catchError(err => throwError(err)));
  }

  deleteProject(id: string): Observable<IDeleteProjectResponse> {
    return this.http
      .post<IDeleteProjectResponse>("Project/Delete", { id })
      .pipe(catchError(err => throwError(err)));
  }
}
