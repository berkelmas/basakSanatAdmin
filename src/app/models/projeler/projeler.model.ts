import { IGeneralResponse } from "../general/table.model";

export interface IProje {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  summary: string;
}

export interface IGetAllProjelerResponse extends IGeneralResponse {
  result: IProje[];
}

export interface IGetSingleProjeResponse extends IGeneralResponse {
  result: IProje;
}
