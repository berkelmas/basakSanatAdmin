import { IGeneralResponse } from "../general/table.model";

export interface IDuyuru {
  id?: string;
  title: string;
  description: string;
}

export interface IGetAllDuyuruResponse extends IGeneralResponse {
  result: IDuyuru[];
}

export interface IGetDuyuruByIdResponse extends IGeneralResponse {
  result: IDuyuru;
}

export interface IUpdateDuyuruResponse extends IGeneralResponse {
  result: boolean;
}

export interface ICreateDuyuruResponse extends IGeneralResponse {
  result: boolean;
}

export interface IDeleteDuyuruResponse extends IGeneralResponse {
  result: boolean;
}
