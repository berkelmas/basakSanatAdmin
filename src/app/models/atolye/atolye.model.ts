import { IGeneralResponse } from "../general/table.model";

export interface IAtolye {
  id?: string;
  title: string;
  date: string;
  description: string;
}

export interface IGetAllAtolyeResponse extends IGeneralResponse {
  result: IAtolye[];
}

export interface ICreateNewAtolyeResponse extends IGeneralResponse {
  result: boolean;
}

export interface IGetAtolyeByIdResponse extends IGeneralResponse {
  result: IAtolye;
}

export interface IUpdateAtolyeResponse extends IGeneralResponse {
  result: boolean;
}

export interface IDeleteAtolyeResponse extends IGeneralResponse {
  result: boolean;
}

export interface IAtolyeApplication {
  id?: string;
  name: string;
  phone: string;
  email: string;
  workplace: string;
  message: string;
}

export interface IGetAtolyeAppliesResponse extends IGeneralResponse {
  result: IAtolyeApplication[];
}
