import { IGeneralResponse } from "../general/table.model";

export interface IBurs {
  id: string;
  title: string;
  description: string;
  summary: string;
}

export interface IGetAllBursResponse extends IGeneralResponse {
  result: IBurs[];
}

export interface ICreateNewBursResponse extends IGeneralResponse {
  result: boolean;
}

export interface IUpdateBursResponse extends IGeneralResponse {
  result: boolean;
}

export interface IDeleteBursResponse extends IGeneralResponse {
  result: boolean;
}

export interface IGetBursByIdResponse extends IGeneralResponse {
  result: IBurs;
}

export interface IBursApplication {
  id?: string;
  name: string;
  phone: string;
  email: string;
  scholarship: string;
  message: string;
}

export interface IGetBursAppliesResponse extends IGeneralResponse {
  result: IBursApplication[];
}
