import { IGeneralResponse } from "../general/table.model";

export interface IContactForm {
  id: string;
  name: string;
  email: string;
  message: string;
}

export interface IGetAllContactFormsResponse extends IGeneralResponse {
  result: IContactForm[];
}
